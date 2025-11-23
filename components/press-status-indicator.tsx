"use client"

import { cn } from "@/lib/utils"
import { Circle } from "lucide-react"

interface PressStatusIndicatorProps {
  status: "running" | "stopped"
  className?: string
}

export function PressStatusIndicator({ status, className }: PressStatusIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Circle className={cn("h-3 w-3 fill-current", status === "running" ? "text-green-500" : "text-red-500")} />
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  )
}
