"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  ZapIcon,
  CrosshairIcon,
  FlameIcon,
  ArrowRightIcon,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const STEPS = [
  {
    icon: ZapIcon,
    title: "Welcome to SignalSky",
    description:
      'SignalSky scans NSE and US markets daily for "Reset & Reclaim" setups — stocks that had a big run, pulled back below their 200-day EMA, and are now reclaiming it near their prior peak.',
    visual: null,
  },
  {
    icon: FlameIcon,
    title: "Heat Levels",
    description:
      "Each signal shows how close the stock is to its prior peak (pre-set ATH). The closer it is, the hotter the signal.",
    visual: "heat",
  },
  {
    icon: CrosshairIcon,
    title: "You're all set",
    description:
      "Open any signal to see the chart, entry/stop/target levels, and add it to your watchlist. New signals appear every evening after market close.",
    visual: null,
  },
]

const HEAT_LEVELS = [
  {
    label: "Breakout",
    desc: "At or above prior peak",
    color: "text-bull",
    bg: "bg-bull/10",
  },
  {
    label: "Boiling",
    desc: "0–2% below prior peak",
    color: "text-heat-boiling",
    bg: "bg-heat-boiling/10",
  },
  {
    label: "Simmering",
    desc: "2–5% below prior peak",
    color: "text-heat-simmering",
    bg: "bg-heat-simmering/10",
  },
  {
    label: "Cooling",
    desc: ">5% below prior peak",
    color: "text-muted-foreground",
    bg: "bg-muted/40",
  },
]

export function OnboardingModal() {
  const { user, refresh } = useAuth()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)

  const hasSeenOnboarding = user?.settings?.hasSeenOnboarding === true
  const open = !!user && !hasSeenOnboarding

  async function handleDismiss() {
    setSaving(true)
    try {
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: { hasSeenOnboarding: true } }),
      })
      await refresh()
    } finally {
      setSaving(false)
    }
  }

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      handleDismiss()
    }
  }

  const currentStep = STEPS[step]
  const Icon = currentStep.icon

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader>
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-1">
            <Icon className="size-5" />
          </div>
          <DialogTitle className="text-base font-semibold">
            {currentStep.title}
          </DialogTitle>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {currentStep.description}
          </p>
        </DialogHeader>

        {currentStep.visual === "heat" && (
          <div className="grid grid-cols-2 gap-2">
            {HEAT_LEVELS.map((h) => (
              <div key={h.label} className={`rounded-lg p-2.5 ${h.bg}`}>
                <span className={`text-[11px] font-semibold ${h.color}`}>
                  {h.label}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <div className="flex items-center gap-1.5 mr-auto">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  i === step
                    ? "w-4 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <Button
            size="sm"
            className="text-xs h-8"
            onClick={handleNext}
            disabled={saving}
          >
            {step < STEPS.length - 1 ? (
              <>
                Next <ArrowRightIcon className="size-3 ml-1" />
              </>
            ) : (
              <>
                Let&apos;s go <ZapIcon className="size-3 ml-1" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
