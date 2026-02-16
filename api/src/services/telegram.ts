import type { Signal } from "../engine/types.js"
import { config } from "../config.js"

/**
 * Telegram alert service.
 * Sends formatted signal cards to users via the Telegram Bot API.
 * Uses grammy in production; this service abstracts the messaging.
 */
export class TelegramService {
  private botToken: string

  constructor() {
    this.botToken = config.telegram.botToken
  }

  get isConfigured(): boolean {
    return this.botToken.length > 0
  }

  /**
   * Format a signal into a Telegram-friendly card message.
   */
  formatSignalCard(signal: Signal): string {
    const currency = signal.exchange === "NSE" ? "₹" : "$"
    const heatEmoji =
      signal.heat === "boiling" ? "🔴" : signal.heat === "simmering" ? "🟡" : "🔵"

    const volumeStatus = signal.volumeSurge >= 1.5 ? "✅ Volume surge" : "Normal volume"

    // Position calc defaults
    const capital = signal.exchange === "NSE" ? 500000 : 10000
    const riskPct = 2
    const stop = signal.ema200
    const riskPerShare = signal.price - stop
    const riskAmount = capital * (riskPct / 100)
    const shares = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0

    return [
      `${heatEmoji} *${signal.strategyName}* Signal`,
      ``,
      `*${signal.symbol}* — ${signal.exchange}`,
      `Price: \`${currency}${signal.price.toLocaleString()}\``,
      `ATH: \`${currency}${signal.ath.toLocaleString()}\``,
      `EMA200: \`${currency}${signal.ema200.toLocaleString()}\``,
      `Distance to ATH: \`${signal.distanceToBreakout.toFixed(1)}%\``,
      `Volume: \`${signal.volumeSurge.toFixed(1)}x\` avg — ${volumeStatus}`,
      ``,
      `📊 *Risk Calc* (${currency}${capital.toLocaleString()} @ ${riskPct}%)`,
      `Stop: \`${currency}${stop.toLocaleString()}\``,
      `Shares: \`${shares}\``,
      `Risk: \`${currency}${riskAmount.toLocaleString()}\``,
    ].join("\n")
  }

  /**
   * Send a signal alert to a Telegram chat.
   */
  async sendAlert(chatId: string, signal: Signal): Promise<boolean> {
    if (!this.isConfigured) {
      console.warn("[Telegram] Bot token not configured, skipping alert")
      return false
    }

    const message = this.formatSignalCard(signal)

    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
      })

      if (!response.ok) {
        const err = await response.text()
        console.error(`[Telegram] Failed to send alert: ${err}`)
        return false
      }

      return true
    } catch (err) {
      console.error("[Telegram] Error sending alert:", err)
      return false
    }
  }
}
