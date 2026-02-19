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
  BellIcon,
  SendIcon,
  CreditCardIcon,
  SparklesIcon,
  CheckIcon,
  PaletteIcon,
  UserIcon,
  CameraIcon,
  Loader2Icon,
  ScaleIcon,
} from "lucide-react"
import { ThemeToggle } from "@/components/signal-sky/theme-toggle"

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

export default function SettingsPage() {
  const { user } = useAuth()
  const tier = user?.tier
  const isPro = tier === "PRO" || tier === "INSTITUTIONAL"
  const trialEndsAt = user?.trialEndsAt ? new Date(user.trialEndsAt) : null
  const isTrialActive = trialEndsAt ? trialEndsAt.getTime() > Date.now() : false
  const daysRemaining = trialEndsAt
    ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)))
    : 0

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <SettingsIcon className="size-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
          <p className="text-xs text-muted-foreground">
            Configure your profile, alerts, preferences, and billing
          </p>
        </div>
      </div>

      {/* Profile */}
      <ProfileCard />

      {/* Subscription */}
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
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                {isPro ? (
                  <SparklesIcon className="size-4 text-primary" />
                ) : (
                  <CreditCardIcon className="size-4 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {isPro ? "Pro Plan" : isTrialActive ? `Trial — ${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining` : "Trial Expired"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isPro
                    ? "Full access to all features"
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

          {isPro && (
            <div className="mt-4 space-y-1.5">
              <Separator />
              <div className="pt-2 grid grid-cols-2 gap-y-1.5 text-xs">
                {[
                  "All Nifty indices + S&P 100 & NASDAQ 100",
                  "Unlimited backtests",
                  "Real-time Telegram alerts",
                  "Volume surge filter",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckIcon className="size-3 text-bull" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appearance */}
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
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">
                  Toggle between light and dark interface
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Telegram Alerts */}
      <Card className="border-border/40 bg-surface">
        <CardHeader>
          <div className="flex items-center gap-2">
            <SendIcon className="size-4 text-primary" />
            <CardTitle className="text-sm">Telegram Alerts</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Receive signal alerts via Telegram when new breakout signals are detected.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
                Telegram Username
              </label>
              <Input
                placeholder="@yourusername"
                className="h-8 font-mono text-sm bg-background max-w-xs"
              />
            </div>
            <Button size="sm" className="h-7 text-xs">
              <BellIcon className="size-3 mr-1" />
              Enable Alerts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Position Defaults */}
      <PositionDefaultsCard />
    </div>
  )
}
