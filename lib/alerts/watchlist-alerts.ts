import { prisma } from "@/lib/prisma"
import { sendSignalAlert } from "@/lib/email/send"
import { sendTelegramMessage } from "@/lib/telegram"

/**
 * Check watchlist price alerts against latest signal prices.
 * Called after each EOD scan (india or us).
 * Non-blocking — all errors are caught and logged.
 */
export async function checkWatchlistAlerts(market: "india" | "us") {
  const exchange = market === "india" ? "NSE" : "US"

  try {
    // Find all active watchlist items with an untriggered alert for this exchange
    const items = await prisma.$queryRawUnsafe(`
      SELECT
        w.id,
        w.user_id AS "userId",
        w.symbol,
        w.exchange,
        w.alert_price AS "alertPrice",
        w.alert_direction AS "alertDirection",
        u.email,
        u.name,
        u.telegram_chat_id AS "telegramChatId",
        u.tier,
        u.trial_ends_at AS "trialEndsAt",
        s.price AS "currentPrice",
        s.heat
      FROM watchlist_items w
      JOIN users u ON u.id = w.user_id
      LEFT JOIN LATERAL (
        SELECT price, heat
        FROM signals
        WHERE symbol = w.symbol AND is_active = true
        ORDER BY signal_date DESC
        LIMIT 1
      ) s ON true
      WHERE w.exchange = $1
        AND w.alert_price IS NOT NULL
        AND w.alert_direction IS NOT NULL
        AND w.alert_triggered_at IS NULL
        AND s.price IS NOT NULL
        AND (
          (w.alert_direction = 'above' AND s.price >= w.alert_price)
          OR
          (w.alert_direction = 'below' AND s.price <= w.alert_price)
        )
        AND (
          u.tier IN ('PRO', 'INSTITUTIONAL')
          OR (u.trial_ends_at IS NOT NULL AND u.trial_ends_at > NOW())
        )
    `, exchange) as Array<{
      id: string
      userId: string
      symbol: string
      exchange: string
      alertPrice: string
      alertDirection: string
      email: string | null
      name: string | null
      telegramChatId: string | null
      tier: string
      trialEndsAt: Date | null
      currentPrice: string
      heat: string
    }>

    if (items.length === 0) return { triggered: 0 }

    // Mark all as triggered immediately to prevent duplicates
    const ids = items.map((i) => i.id)
    await prisma.$executeRawUnsafe(
      `UPDATE watchlist_items SET alert_triggered_at = NOW() WHERE id = ANY($1::uuid[])`,
      ids
    )

    // Group by user so we can send one bundled Telegram message per user
    const byUser = new Map<string, typeof items>()
    for (const item of items) {
      if (!item.telegramChatId) continue
      if (!byUser.has(item.userId)) byUser.set(item.userId, [])
      byUser.get(item.userId)!.push(item)
    }

    for (const [, userItems] of byUser) {
      const chatId = userItems[0].telegramChatId!
      const currency = userItems[0].exchange === "NSE" ? "₹" : "$"

      const lines: string[] = [
        `🔔 <b>${userItems.length} Watchlist Alert${userItems.length !== 1 ? "s" : ""}</b>`,
        ``,
      ]
      for (const item of userItems) {
        const symbolDisplay = item.symbol.replace(".NS", "")
        const dir = item.alertDirection === "above" ? "crossed above" : "dropped below"
        const alertPriceNum = Number(item.alertPrice)
        const currentPriceNum = Number(item.currentPrice)
        lines.push(
          `<b>${symbolDisplay}</b> — ${dir} <b>${currency}${alertPriceNum.toLocaleString()}</b>`,
          `Current: <code>${currency}${currentPriceNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}</code>  Heat: <b>${item.heat}</b>`,
          ``,
        )
      }
      sendTelegramMessage(chatId, lines.join("\n")).catch(() => {})
    }

    console.log(`[watchlist-alerts] triggered ${items.length} alerts for ${exchange}`)
    return { triggered: items.length }
  } catch (e: any) {
    console.error(`[watchlist-alerts] error:`, e.message)
    return { triggered: 0, error: e.message }
  }
}
