"use client"

import { useState, useRef, useCallback } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DatabaseIcon,
  UploadIcon,
  FileSpreadsheetIcon,
  BarChart3Icon,
  CheckCircle2Icon,
  AlertCircleIcon,
  Loader2Icon,
} from "lucide-react"

type UploadResult = {
  inserted?: number
  updated?: number
  skippedDuplicates?: number
  total?: number
  errors?: { line: number; reason: string }[]
  error?: string
}

const UNIVERSE_OPTIONS = [
  "nifty50",
  "niftynext50",
  "nifty200",
  "niftymidcap50",
  "niftymidcap100",
  "niftysmallcap50",
  "niftysmallcap100",
  "niftybank",
  "sp100",
  "nasdaq100",
]

const EXCHANGE_OPTIONS = ["NSE", "BSE", "NASDAQ", "NYSE"]

function UploadCard({
  title,
  description,
  icon: Icon,
  acceptHint,
  fields,
  endpoint,
  buildFormData,
}: {
  title: string
  description: string
  icon: React.ElementType
  acceptHint: string
  fields: React.ReactNode
  endpoint: string
  buildFormData: (file: File) => FormData
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<UploadResult | null>(null)

  const handleUpload = useCallback(async () => {
    if (!file) return
    setUploading(true)
    setResult(null)
    try {
      const fd = buildFormData(file)
      const res = await fetch(endpoint, { method: "POST", body: fd })
      const data: UploadResult = await res.json()
      if (!res.ok) {
        setResult({ error: data.error ?? `Upload failed (${res.status})` })
      } else {
        setResult(data)
      }
    } catch (e: any) {
      setResult({ error: e.message ?? "Network error" })
    } finally {
      setUploading(false)
    }
  }, [file, endpoint, buildFormData])

  const hasErrors = result?.errors && result.errors.length > 0
  const isSuccess = result && !result.error

  return (
    <Card className="border-border/40 bg-surface">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-primary" />
          <CardTitle className="text-sm">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields}

        <div>
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 block">
            CSV File
          </label>
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              className="text-xs file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary hover:file:bg-primary/20 file:cursor-pointer cursor-pointer"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null)
                setResult(null)
              }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{acceptHint}</p>
        </div>

        <Button
          size="sm"
          className="h-8 text-xs gap-1.5"
          disabled={!file || uploading}
          onClick={handleUpload}
        >
          {uploading ? (
            <Loader2Icon className="size-3 animate-spin" />
          ) : (
            <UploadIcon className="size-3" />
          )}
          {uploading ? "Uploading..." : "Upload"}
        </Button>

        {/* Results */}
        {result && (
          <div
            className={`rounded-lg border p-3 text-xs space-y-1.5 ${
              result.error
                ? "border-destructive/30 bg-destructive/5"
                : hasErrors
                  ? "border-yellow-500/30 bg-yellow-500/5"
                  : "border-bull/30 bg-bull/5"
            }`}
          >
            {result.error ? (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircleIcon className="size-3.5 shrink-0" />
                <span>{result.error}</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2Icon className="size-3.5 shrink-0 text-bull" />
                  <span className="font-medium">Upload complete</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-muted-foreground pl-5">
                  {result.inserted !== undefined && (
                    <span>Inserted: <strong className="text-foreground">{result.inserted}</strong></span>
                  )}
                  {result.updated !== undefined && (
                    <span>Updated: <strong className="text-foreground">{result.updated}</strong></span>
                  )}
                  {result.skippedDuplicates !== undefined && (
                    <span>Skipped: <strong className="text-foreground">{result.skippedDuplicates}</strong></span>
                  )}
                  <span>Total: <strong className="text-foreground">{result.total}</strong></span>
                </div>
              </>
            )}

            {hasErrors && (
              <div className="mt-2 space-y-1 pl-5">
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                  Errors ({result.errors!.length}{result.errors!.length >= 20 ? "+" : ""}):
                </span>
                <ul className="space-y-0.5 text-muted-foreground max-h-40 overflow-y-auto">
                  {result.errors!.map((err, i) => (
                    <li key={i}>
                      Line {err.line}: {err.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function AdminDataPage() {
  const { loading } = useAuth()
  const [universe, setUniverse] = useState("nifty50")
  const [exchange, setExchange] = useState("NSE")

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2Icon className="size-6 text-primary animate-spin" />
      </div>
    )
  }

  const selectClasses =
    "h-8 rounded-md border border-input bg-background px-2.5 text-xs outline-none focus:ring-2 focus:ring-ring/50"

  return (
    <div className="flex flex-col gap-6 px-6 py-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <DatabaseIcon className="size-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Data Upload</h1>
          <p className="text-xs text-muted-foreground">
            Upload universe constituents and daily OHLCV bars via CSV
          </p>
        </div>
      </div>

      {/* Universe Members Upload */}
      <UploadCard
        title="Upload Universe Constituents"
        description="Upload a CSV of stock symbols to populate an index universe."
        icon={FileSpreadsheetIcon}
        acceptHint="CSV format: symbol,name,sector (name and sector are optional)"
        endpoint="/api/admin/universe-members/upload"
        fields={
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Universe
            </label>
            <select
              value={universe}
              onChange={(e) => setUniverse(e.target.value)}
              className={selectClasses}
            >
              {UNIVERSE_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        }
        buildFormData={useCallback(
          (file: File) => {
            const fd = new FormData()
            fd.append("file", file)
            fd.append("universe", universe)
            return fd
          },
          [universe],
        )}
      />

      {/* Daily Bars Upload */}
      <UploadCard
        title="Upload Daily Bars (OHLCV)"
        description="Upload historical daily price data for stocks."
        icon={BarChart3Icon}
        acceptHint="CSV format: symbol,date,open,high,low,close,volume[,adjFactor]  (date: YYYY-MM-DD)"
        endpoint="/api/admin/daily-bars/upload"
        fields={
          <div className="flex gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Exchange
              </label>
              <select
                value={exchange}
                onChange={(e) => setExchange(e.target.value)}
                className={selectClasses}
              >
                {EXCHANGE_OPTIONS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
        buildFormData={useCallback(
          (file: File) => {
            const fd = new FormData()
            fd.append("file", file)
            fd.append("exchange", exchange)
            fd.append("source", "csv")
            return fd
          },
          [exchange],
        )}
      />
    </div>
  )
}
