"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SettingsIcon,
  SendIcon,
  CreditCardIcon,
  SparklesIcon,
  CheckIcon,
  PaletteIcon,
  UserIcon,
  CameraIcon,
  Loader2Icon,
  ScaleIcon,
  MessageSquareIcon,
  BugIcon,
  LightbulbIcon,
  MessageCircleIcon,
  InfinityIcon,
  CalendarIcon,
  RefreshCwIcon,
  XCircleIcon,
  BellIcon,
  BotIcon,
  MailIcon,
  ExternalLinkIcon,
  ZapIcon,
} from "lucide-react"
import { ThemeToggle } from "@/components/signal-sky/theme-toggle"
import { toast } from "sonner"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function ProfileCard() {
  const { user, refresh } = useAuth()
  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      setName(user.name ?? "")
      setImageUrl(user.image ?? "")
    }
  }, [user])

  async function handleImageUpload(file: File) {
    if (!user) return
    setUploading(true)
    try {
      const supabase = createClient()
      const fileExt = file.name.split(".").pop()
      const filePath = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath)

      setImageUrl(publicUrl)

      // Save to profile
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: publicUrl }),
      })
      if (res.ok) {
        await refresh()
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        await refresh()
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = name !== (user?.name ?? "")

  return (
    <Card className="border-border/40 bg-surface">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserIcon className="size-4 text-primary" />
          <CardTitle className="text-sm">Profile</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Your account details and profile picture.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className="size-16 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="size-16 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xl font-semibold text-primary">
                  {name?.[0]?.toUpperCase() ?? "U"}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-0.5 -right-0.5 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-110"
            >
              {uploading ? (
                <Loader2Icon className="size-3 animate-spin" />
              ) : (
                <CameraIcon className="size-3" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload(file)
              }}
            />
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-8 text-sm bg-background max-w-xs"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
                Email
              </label>
              <p className="text-sm text-muted-foreground font-mono">
                {user?.email ?? "\u2014"}
              </p>
            </div>

            <Button
              size="sm"
              className="h-7 text-xs gap-1.5"
              onClick={handleSave}
              disabled={!hasChanges || saving}
            >
              {saving ? (
                <Loader2Icon className="size-3 animate-spin" />
              ) : saved ? (
                <CheckIcon className="size-3" />
              ) : null}
              {saved ? "Saved" : "Save Changes"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PositionDefaultsCard() {
  const { user, refresh } = useAuth()
  const [capitalINR, setCapitalINR] = useState("100000")
  const [capitalUSD, setCapitalUSD] = useState("1000")
  const [riskPct, setRiskPct] = useState("2")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user?.settings) {
      if (user.settings.defaultCapitalINR != null) setCapitalINR(String(user.settings.defaultCapitalINR))
      if (user.settings.defaultCapitalUSD != null) setCapitalUSD(String(user.settings.defaultCapitalUSD))
      if (user.settings.defaultRiskPct != null) setRiskPct(String(user.settings.defaultRiskPct))
    }
  }, [user])

  const hasChanges =
    String(user?.settings?.defaultCapitalINR ?? 100000) !== capitalINR ||
    String(user?.settings?.defaultCapitalUSD ?? 1000) !== capitalUSD ||
    String(user?.settings?.defaultRiskPct ?? 2) !== riskPct

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            defaultCapitalINR: parseFloat(capitalINR) || 100000,
            defaultCapitalUSD: parseFloat(capitalUSD) || 1000,
            defaultRiskPct: parseFloat(riskPct) || 2,
          },
        }),
      })
      if (res.ok) {
        await refresh()
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="border-border/40 bg-surface">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ScaleIcon className="size-4 text-primary" />
          <CardTitle className="text-sm">Position Defaults</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Default capital for the trade ticket calculator. These values are used when you open a signal detail page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
              India Capital (₹)
            </label>
            <Input
              type="number"
              value={capitalINR}
              onChange={(e) => setCapitalINR(e.target.value)}
              className="h-8 font-mono text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
              US Capital ($)
            </label>
            <Input
              type="number"
              value={capitalUSD}
              onChange={(e) => setCapitalUSD(e.target.value)}
              className="h-8 font-mono text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
              Default Risk %
            </label>
            <Input
              type="number"
              value={riskPct}
              onChange={(e) => setRiskPct(e.target.value)}
              className="h-8 font-mono text-sm bg-background"
              step="0.5"
            />
          </div>
        </div>
        <Button
          size="sm"
          className="h-7 text-xs gap-1.5 mt-3"
          onClick={handleSave}
          disabled={!hasChanges || saving}
        >
          {saving ? (
            <Loader2Icon className="size-3 animate-spin" />
          ) : saved ? (
            <CheckIcon className="size-3" />
          ) : null}
          {saved ? "Saved" : "Save Defaults"}
        </Button>
      </CardContent>
    </Card>
  )
}

const FEEDBACK_CATEGORIES = [
  { value: "bug", label: "Bug", icon: BugIcon, color: "text-bear" },
  { value: "feature", label: "Feature", icon: LightbulbIcon, color: "text-primary" },
  { value: "general", label: "General", icon: MessageCircleIcon, color: "text-muted-foreground" },
] as const

function FeedbackCard() {
  const [category, setCategory] = useState<string>("general")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit() {
    if (!message.trim() || message.trim().length < 5) return
    setSending(true)
    setSent(false)
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, message: message.trim() }),
      })
      if (res.ok) {
        setSent(true)
        setMessage("")
        setCategory("general")
        setTimeout(() => setSent(false), 3000)
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <Card className="border-border/40 bg-surface">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquareIcon className="size-4 text-primary" />
          <CardTitle className="text-sm">Send Feedback</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Found a bug? Have an idea? Let us know — we read every message.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Category pills */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Category
            </label>
            <div className="flex gap-1.5">
              {FEEDBACK_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`
                    inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium
                    transition-all duration-150
                    ${category === cat.value
                      ? `border-primary/40 bg-primary/10 ${cat.color}`
                      : "border-border/30 bg-background text-muted-foreground hover:border-border/60 hover:text-foreground"
                    }
                  `}
                >
                  <cat.icon className="size-3" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the issue or your idea..."
              rows={3}
              maxLength={2000}
              className="flex w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none max-w-lg"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-muted-foreground/50 font-mono">
                {message.length}/2000
              </span>
            </div>
          </div>

          <Button
            size="sm"
            className="h-7 text-xs gap-1.5"
            onClick={handleSubmit}
            disabled={sending || !message.trim() || message.trim().length < 5}
          >
            {sending ? (
              <Loader2Icon className="size-3 animate-spin" />
            ) : sent ? (
              <CheckIcon className="size-3" />
            ) : (
              <SendIcon className="size-3" />
            )}
            {sent ? "Sent — thank you!" : "Send Feedback"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const HEAT_OPTIONS = [
  { value: "breakout", label: "Breakout", emoji: "🚀" },
  { value: "boiling", label: "Boiling", emoji: "🔥" },
  { value: "simmering", label: "Simmering", emoji: "🌡️" },
  { value: "cooling", label: "Cooling", emoji: "❄️" },
]

const UNIVERSE_OPTIONS = [
  { value: "nifty50", label: "Nifty 50" },
  { value: "niftynext50", label: "Nifty Next 50" },
  { value: "nifty200", label: "Nifty 200" },
  { value: "niftymidcap50", label: "Midcap 50" },
  { value: "niftymidcap100", label: "Midcap 100" },
  { value: "sp100", label: "S&P 100" },
  { value: "nasdaq100", label: "NASDAQ 100" },
]

type AlertPrefs = {
  preferences: Array<{ id: string; channel: string; heatFilter: string[]; universes: string[]; isActive: boolean }>
  telegramConnected: boolean
  emailDigest: string
  emailMarketing: boolean
}

function AlertsCard() {
  const { user } = useAuth()
  const [prefs, setPrefs] = useState<AlertPrefs | null>(null)
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)
  const [saving, setSaving] = useState(false)

  // Local state for editable preferences
  const [telegramPref, setTelegramPref] = useState<{ heatFilter: string[]; universes: string[]; isActive: boolean } | null>(null)
  const [emailPref, setEmailPref] = useState<{ heatFilter: string[]; universes: string[]; isActive: boolean } | null>(null)
  const [emailDigest, setEmailDigest] = useState("daily")
  const [emailMarketing, setEmailMarketing] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("/api/alerts/preferences")
      .then((r) => r.json())
      .then((data: AlertPrefs) => {
        setPrefs(data)
        setEmailDigest(data.emailDigest)
        setEmailMarketing(data.emailMarketing)
        const tg = data.preferences.find((p) => p.channel === "telegram")
        const em = data.preferences.find((p) => p.channel === "email")
        setTelegramPref(tg ? { heatFilter: tg.heatFilter, universes: tg.universes, isActive: tg.isActive } : { heatFilter: [], universes: [], isActive: true })
        setEmailPref(em ? { heatFilter: em.heatFilter, universes: em.universes, isActive: em.isActive } : { heatFilter: [], universes: [], isActive: true })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleConnectTelegram() {
    setConnecting(true)
    try {
      const res = await fetch("/api/alerts/telegram/connect", { method: "POST" })
      const data = await res.json()
      if (data.deepLink) {
        window.open(data.deepLink, "_blank")
        toast("Telegram opened — tap Start to connect your account")
      }
    } catch {
      toast.error("Failed to generate Telegram link")
    } finally {
      setConnecting(false)
    }
  }

  async function handleDisconnectTelegram() {
    setDisconnecting(true)
    try {
      await fetch("/api/alerts/telegram/disconnect", { method: "POST" })
      setPrefs((p) => p ? { ...p, telegramConnected: false } : p)
      toast("Telegram disconnected")
    } catch {
      toast.error("Failed to disconnect")
    } finally {
      setDisconnecting(false)
    }
  }

  function toggleHeat(pref: "telegram" | "email", heat: string) {
    if (pref === "telegram" && telegramPref) {
      const current = telegramPref.heatFilter
      setTelegramPref({ ...telegramPref, heatFilter: current.includes(heat) ? current.filter((h) => h !== heat) : [...current, heat] })
    }
    if (pref === "email" && emailPref) {
      const current = emailPref.heatFilter
      setEmailPref({ ...emailPref, heatFilter: current.includes(heat) ? current.filter((h) => h !== heat) : [...current, heat] })
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      await Promise.all([
        telegramPref && fetch("/api/alerts/preferences", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channel: "telegram", ...telegramPref, emailDigest, emailMarketing }),
        }),
        emailPref && fetch("/api/alerts/preferences", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channel: "email", ...emailPref }),
        }),
      ])
      toast("Alert preferences saved")
    } catch {
      toast.error("Failed to save preferences")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="border-border/40 bg-surface">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BellIcon className="size-4 text-primary" />
          <CardTitle className="text-sm">Alerts</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Get notified when new signals appear — via Telegram or email.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2Icon className="size-3 animate-spin" />
            Loading preferences…
          </div>
        ) : (
          <>
            {/* ── Telegram ─────────────────────────────── */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BotIcon className="size-3.5 text-primary" />
                  <span className="text-sm font-medium">Telegram</span>
                </div>
                {prefs?.telegramConnected ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-bull flex items-center gap-1">
                      <CheckIcon className="size-3" /> Connected
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-[11px] text-muted-foreground hover:text-bear px-2"
                      onClick={handleDisconnectTelegram}
                      disabled={disconnecting}
                    >
                      {disconnecting ? <Loader2Icon className="size-3 animate-spin" /> : "Disconnect"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    className="h-7 text-xs gap-1.5"
                    onClick={handleConnectTelegram}
                    disabled={connecting}
                  >
                    {connecting ? <Loader2Icon className="size-3 animate-spin" /> : <ExternalLinkIcon className="size-3" />}
                    Connect Telegram
                  </Button>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {prefs?.telegramConnected
                  ? "You'll receive a message for each new signal matching your filters."
                  : "Click to open our Telegram bot and tap Start to link your account."}
              </p>
              {prefs?.telegramConnected && telegramPref && (
                <div className="rounded-lg border border-border/30 p-3 space-y-2.5 bg-background/50">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5">Heat filter (leave empty = all)</label>
                    <div className="flex flex-wrap gap-1.5">
                      {HEAT_OPTIONS.map((h) => (
                        <button
                          key={h.value}
                          type="button"
                          onClick={() => toggleHeat("telegram", h.value)}
                          className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] transition-all ${
                            telegramPref.heatFilter.includes(h.value)
                              ? "border-primary/40 bg-primary/10 text-foreground"
                              : "border-border/30 bg-background text-muted-foreground hover:border-border/60"
                          }`}
                        >
                          {h.emoji} {h.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Enabled</label>
                    <button
                      type="button"
                      onClick={() => setTelegramPref({ ...telegramPref, isActive: !telegramPref.isActive })}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${telegramPref.isActive ? "bg-primary" : "bg-muted"}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${telegramPref.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* ── Email alerts ─────────────────────────── */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MailIcon className="size-3.5 text-primary" />
                <span className="text-sm font-medium">Email</span>
              </div>
              {emailPref && (
                <div className="rounded-lg border border-border/30 p-3 space-y-3 bg-background/50">
                  {/* Immediate signal alerts toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium">Immediate signal alerts</p>
                      <p className="text-[11px] text-muted-foreground">Get an email for each new signal</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmailPref({ ...emailPref, isActive: !emailPref.isActive })}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${emailPref.isActive ? "bg-primary" : "bg-muted"}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${emailPref.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>

                  {emailPref.isActive && (
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5">Heat filter (leave empty = all)</label>
                      <div className="flex flex-wrap gap-1.5">
                        {HEAT_OPTIONS.map((h) => (
                          <button
                            key={h.value}
                            type="button"
                            onClick={() => toggleHeat("email", h.value)}
                            className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] transition-all ${
                              emailPref.heatFilter.includes(h.value)
                                ? "border-primary/40 bg-primary/10 text-foreground"
                                : "border-border/30 bg-background text-muted-foreground hover:border-border/60"
                            }`}
                          >
                            {h.emoji} {h.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Digest cadence */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5">Signal digest</label>
                    <div className="flex gap-1.5">
                      {[
                        { value: "daily", label: "Daily" },
                        { value: "weekly", label: "Weekly" },
                        { value: "off", label: "Off" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setEmailDigest(opt.value)}
                          className={`inline-flex items-center rounded-md border px-3 py-1 text-[11px] transition-all ${
                            emailDigest === opt.value
                              ? "border-primary/40 bg-primary/10 text-foreground"
                              : "border-border/30 bg-background text-muted-foreground hover:border-border/60"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Summary of all active signals, sent at 7 AM IST</p>
                  </div>

                  {/* Marketing toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium">Product updates</p>
                      <p className="text-[11px] text-muted-foreground">Feature announcements &amp; news</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmailMarketing(!emailMarketing)}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${emailMarketing ? "bg-primary" : "bg-muted"}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${emailMarketing ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Save */}
            <Button
              size="sm"
              className="h-7 text-xs gap-1.5"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? <Loader2Icon className="size-3 animate-spin" /> : <ZapIcon className="size-3" />}
              Save Alert Preferences
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

type SubInfo = {
  billingInterval: string
  status: string
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
  isAutopay: boolean
} | null

function SubscriptionCard() {
  const { user } = useAuth()
  const tier = user?.tier
  const isPro = tier === "PRO" || tier === "INSTITUTIONAL"
  const isInstitutional = tier === "INSTITUTIONAL"
  const trialEndsAt = user?.trialEndsAt ? new Date(user.trialEndsAt) : null
  const isTrialActive = trialEndsAt ? trialEndsAt.getTime() > Date.now() : false
  const daysRemaining = trialEndsAt
    ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)))
    : 0

  const [sub, setSub] = useState<SubInfo>(null)
  const [loadingSub, setLoadingSub] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancelConfirm, setCancelConfirm] = useState(false)

  useEffect(() => {
    if (!isPro || isInstitutional) return
    setLoadingSub(true)
    fetch("/api/payments/subscription/status")
      .then((r) => r.json())
      .then((d) => setSub(d.subscription ?? null))
      .catch(() => {})
      .finally(() => setLoadingSub(false))
  }, [isPro, isInstitutional])

  async function handleCancel() {
    if (!cancelConfirm) {
      setCancelConfirm(true)
      setTimeout(() => setCancelConfirm(false), 5000)
      return
    }
    setCancelling(true)
    try {
      const res = await fetch("/api/payments/subscription/cancel", { method: "POST" })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Failed to cancel")
        return
      }
      toast("Subscription cancelled — you'll keep access until the end of your billing period")
      setSub((prev) => prev ? { ...prev, cancelAtPeriodEnd: true } : prev)
      setCancelConfirm(false)
    } catch {
      toast.error("Failed to cancel subscription")
    } finally {
      setCancelling(false)
    }
  }

  function formatDate(iso: string | null) {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  }

  function planLabel() {
    if (!sub) return "Pro Plan"
    if (sub.billingInterval === "lifetime") return "Lifetime Plan"
    if (sub.billingInterval === "yearly") return "Pro — Yearly"
    return "Pro — Monthly"
  }

  return (
    <Card className="border-border/40 bg-surface">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCardIcon className="size-4 text-primary" />
          <CardTitle className="text-sm">Subscription</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Manage your plan and billing details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              {isPro ? (
                sub?.billingInterval === "lifetime"
                  ? <InfinityIcon className="size-4 text-primary" />
                  : <SparklesIcon className="size-4 text-primary" />
              ) : (
                <CreditCardIcon className="size-4 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {isPro
                  ? planLabel()
                  : isTrialActive
                    ? `Trial — ${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`
                    : "Trial Expired"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isPro
                  ? sub?.cancelAtPeriodEnd
                    ? `Cancels on ${formatDate(sub.currentPeriodEnd)}`
                    : sub?.isAutopay
                      ? `Renews ${formatDate(sub.currentPeriodEnd)}`
                      : "Full access to all features"
                  : isTrialActive
                    ? "Full access during your trial period"
                    : "Subscribe to continue using SignalSky"}
              </p>
            </div>
          </div>
          {!isPro && (
            <Button size="sm" className="h-8 text-xs gap-1" nativeButton={false} render={<Link href="/pricing" />}>
              <SparklesIcon className="size-3" />
              {isTrialActive ? "Subscribe Now" : "View Plans"}
            </Button>
          )}
        </div>

        {isPro && !isInstitutional && (
          <>
            <Separator />

            {/* Billing details */}
            {loadingSub ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2Icon className="size-3 animate-spin" />
                Loading billing info...
              </div>
            ) : sub ? (
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium capitalize">{sub.billingInterval}</span>

                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">
                  {sub.cancelAtPeriodEnd ? "Cancels at period end" : sub.status}
                </span>

                {sub.currentPeriodStart && (
                  <>
                    <span className="text-muted-foreground">Started</span>
                    <span className="font-mono">{formatDate(sub.currentPeriodStart)}</span>
                  </>
                )}

                {sub.currentPeriodEnd && sub.billingInterval !== "lifetime" && (
                  <>
                    <span className="text-muted-foreground">
                      {sub.cancelAtPeriodEnd ? "Access until" : "Next renewal"}
                    </span>
                    <span className="font-mono">{formatDate(sub.currentPeriodEnd)}</span>
                  </>
                )}

                {sub.isAutopay && (
                  <>
                    <span className="text-muted-foreground">Autopay</span>
                    <span className="flex items-center gap-1 text-bull">
                      <RefreshCwIcon className="size-3" />
                      UPI Mandate active
                    </span>
                  </>
                )}
              </div>
            ) : null}

            {/* Cancel / resubscribe */}
            {sub && sub.isAutopay && !sub.cancelAtPeriodEnd && (
              <div className="pt-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-muted-foreground hover:text-bear gap-1.5"
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  {cancelling ? (
                    <Loader2Icon className="size-3 animate-spin" />
                  ) : (
                    <XCircleIcon className="size-3" />
                  )}
                  {cancelConfirm ? "Tap again to confirm cancellation" : "Cancel subscription"}
                </Button>
              </div>
            )}

            {sub?.cancelAtPeriodEnd && (
              <div className="rounded-md border border-border/40 bg-muted/30 px-3 py-2">
                <p className="text-xs text-muted-foreground">
                  Your subscription is cancelled. You have access until <span className="font-medium text-foreground">{formatDate(sub.currentPeriodEnd)}</span>.
                  {" "}<Link href="/pricing" className="text-primary hover:underline">Resubscribe</Link> anytime.
                </p>
              </div>
            )}

            {!sub && !loadingSub && (
              <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                {["All Nifty indices + S&P 100 & NASDAQ 100", "Unlimited backtests", "Unlimited trade journal", "Priority support"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckIcon className="size-3 text-bull" />
                    {f}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {isInstitutional && (
          <>
            <Separator />
            <p className="text-xs text-muted-foreground">Institutional access — managed by your organisation.</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

const SETTINGS_TABS = [
  { value: "account",  label: "Account",  icon: UserIcon },
  { value: "alerts",   label: "Alerts",   icon: BellIcon },
  { value: "billing",  label: "Billing",  icon: CreditCardIcon },
  { value: "trading",  label: "Trading",  icon: ScaleIcon },
  { value: "feedback", label: "Feedback", icon: MessageSquareIcon },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-col px-4 sm:px-6 py-5 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <SettingsIcon className="size-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
          <p className="text-xs text-muted-foreground">
            Manage your account, alerts, and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-full">
        {/* Tab bar — scrollable on mobile */}
        <div className="-mx-4 sm:-mx-6 px-4 sm:px-6 border-b border-border/40 overflow-x-auto overflow-y-hidden">
          <TabsList className="bg-transparent rounded-none p-0 h-auto w-auto inline-flex gap-0">
            {SETTINGS_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                  gap-1.5 rounded-none px-4 h-auto py-2.5 text-[11px] font-medium
                  border-0 border-b-2 border-b-transparent
                  data-active:border-b-primary data-active:text-foreground
                  data-active:bg-transparent data-active:shadow-none
                  dark:data-active:bg-transparent
                  text-muted-foreground hover:text-foreground
                  bg-transparent whitespace-nowrap transition-colors
                "
              >
                <tab.icon className="size-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Account — Profile + Appearance */}
        <TabsContent value="account" className="mt-6 space-y-5">
          <ProfileCard />
          <Card className="border-border/40 bg-surface">
            <CardHeader>
              <div className="flex items-center gap-2">
                <PaletteIcon className="size-4 text-primary" />
                <CardTitle className="text-sm">Appearance</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Switch between light and dark mode to match your preference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">Toggle between light and dark interface</p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts */}
        <TabsContent value="alerts" className="mt-6">
          <AlertsCard />
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="mt-6">
          <SubscriptionCard />
        </TabsContent>

        {/* Trading — Position Defaults */}
        <TabsContent value="trading" className="mt-6">
          <PositionDefaultsCard />
        </TabsContent>

        {/* Feedback */}
        <TabsContent value="feedback" className="mt-6">
          <FeedbackCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
