"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KPIGaugeProps {
  title: string
  value: number
  format?: "percentage" | "number"
  thresholds?: {
    good: number
    warning: number
  }
  className?: string
}

export function KPIGauge({ title, value, format = "percentage", thresholds, className }: KPIGaugeProps) {
  const displayValue = format === "percentage" ? `${(value * 100).toFixed(1)}%` : value.toFixed(0)

  // Determine color based on thresholds
  let colorClass = "text-muted-foreground"
  let bgClass = "bg-muted"

  if (thresholds && format === "percentage") {
    if (value >= thresholds.good) {
      colorClass = "text-green-600 dark:text-green-400"
      bgClass = "bg-green-100 dark:bg-green-950"
    } else if (value >= thresholds.warning) {
      colorClass = "text-yellow-600 dark:text-yellow-400"
      bgClass = "bg-yellow-100 dark:bg-yellow-950"
    } else {
      colorClass = "text-red-600 dark:text-red-400"
      bgClass = "bg-red-100 dark:bg-red-950"
    }
  }

  // Calculate gauge fill percentage
  const fillPercentage = format === "percentage" ? Math.min(value * 100, 100) : Math.min((value / 100) * 100, 100)

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className={cn("text-3xl font-bold", colorClass)}>{displayValue}</div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full transition-all duration-500", bgClass)}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
