"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className={cn("h-8 w-[60px] rounded-full bg-muted animate-pulse", className)} />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative h-8 w-[60px] rounded-full p-[3px] transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isDark
          ? "bg-[oklch(0.22_0.015_260)]"
          : "bg-[oklch(0.88_0.02_80)]",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Track background — stars in dark, clouds in light */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        {/* Dark mode: stars */}
        <span className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isDark ? "opacity-100" : "opacity-0"
        )}>
          <span className="absolute top-[7px] left-[10px] size-[2px] rounded-full bg-white/60" />
          <span className="absolute top-[14px] left-[18px] size-[1.5px] rounded-full bg-white/40" />
          <span className="absolute top-[20px] left-[12px] size-[1px] rounded-full bg-white/50" />
          <span className="absolute top-[9px] left-[24px] size-[1.5px] rounded-full bg-white/30" />
          <span className="absolute top-[18px] left-[28px] size-[2px] rounded-full bg-white/45" />
        </span>
        {/* Light mode: soft rays */}
        <span className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isDark ? "opacity-0" : "opacity-100"
        )}>
          <span className="absolute top-[10px] right-[14px] size-[3px] rounded-full bg-[oklch(0.82_0.12_80)] blur-[1px]" />
          <span className="absolute top-[18px] right-[22px] size-[2px] rounded-full bg-[oklch(0.85_0.10_80)] blur-[1px]" />
        </span>
      </span>

      {/* Thumb */}
      <span
        className={cn(
          "relative z-10 flex size-[26px] items-center justify-center rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isDark
            ? "translate-x-0 bg-[oklch(0.85_0.03_260)] shadow-[0_1px_8px_oklch(0.72_0.19_220/0.2)]"
            : "translate-x-[26px] bg-white shadow-[0_2px_8px_oklch(0.5_0.05_80/0.25)]"
        )}
      >
        {/* Moon icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "absolute size-[14px] transition-all duration-500",
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50"
          )}
        >
          <path
            d="M21.75 15.5a9.72 9.72 0 0 1-13.25-13.25A10 10 0 1 0 21.75 15.5Z"
            fill="oklch(0.35 0.03 260)"
            stroke="oklch(0.35 0.03 260)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Sun icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "absolute size-[15px] transition-all duration-500",
            isDark
              ? "opacity-0 -rotate-90 scale-50"
              : "opacity-100 rotate-0 scale-100"
          )}
        >
          <circle cx="12" cy="12" r="4" fill="oklch(0.62 0.18 80)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 12 + Math.cos(rad) * 6.5
            const y1 = 12 + Math.sin(rad) * 6.5
            const x2 = 12 + Math.cos(rad) * 8.5
            const y2 = 12 + Math.sin(rad) * 8.5
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="oklch(0.62 0.18 80)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}
        </svg>
      </span>
    </button>
  )
}

/** Compact icon-only toggle for tight spaces like sidebars */
export function ThemeToggleCompact({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className={cn("size-8 rounded-lg bg-muted animate-pulse", className)} />
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex size-8 items-center justify-center rounded-lg border border-border/40 bg-surface/60 text-muted-foreground transition-all hover:text-foreground hover:bg-surface hover:border-border/60",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Moon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "absolute size-[14px] transition-all duration-400",
          isDark
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-0"
        )}
      >
        <path
          d="M21.75 15.5a9.72 9.72 0 0 1-13.25-13.25A10 10 0 1 0 21.75 15.5Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "absolute size-[15px] transition-all duration-400",
          isDark
            ? "opacity-0 -rotate-90 scale-0"
            : "opacity-100 rotate-0 scale-100"
        )}
      >
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 12 + Math.cos(rad) * 7
          const y1 = 12 + Math.sin(rad) * 7
          const x2 = 12 + Math.cos(rad) * 9
          const y2 = 12 + Math.sin(rad) * 9
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )
        })}
      </svg>
    </button>
  )
}
