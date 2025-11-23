"use client"
import type { PressKPI } from "@/lib/types"

interface PressIndicatorsProps {
  kpi: PressKPI
  title: string
  variant: "realtime" | "period"
}

export function PressIndicators({ kpi, title, variant }: PressIndicatorsProps) {
  const bgColor = variant === "realtime" ? "bg-teal-700" : "bg-teal-800"

  return (
    <div className="space-y-2">
      <h3 className="text-center text-sm font-semibold text-slate-900">{title}</h3>
      <div className="space-y-1">
        {/* TRS */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">TRS</span>
          <div className={`${bgColor} min-w-[140px] px-3 py-1 text-center text-sm font-semibold text-white`}>
            {(kpi.trs * 100).toFixed(2)}%
          </div>
        </div>

        {/* Total pièces bonnes */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">Total pièces bonnes</span>
          <div className={`${bgColor} min-w-[140px] px-3 py-1 text-center text-sm font-semibold text-white`}>
            {kpi.nbPiecesBonnes.toFixed(0)}
          </div>
        </div>

        {/* Consommation matière */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">Consommation matière</span>
          <div className={`${bgColor} min-w-[140px] px-3 py-1 text-center text-sm font-semibold text-white`}>
            {kpi.consommationMatiere.toFixed(0)}
          </div>
        </div>

        {/* Cumul temps arrêt */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">Cumul temps arrêt</span>
          <div className={`${bgColor} min-w-[140px] px-3 py-1 text-center text-xs font-semibold text-white`}>
            {kpi.cumulTempsArret}
          </div>
        </div>
      </div>
    </div>
  )
}
