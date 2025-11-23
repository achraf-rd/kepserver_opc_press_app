"use client"

import type { GlobalKPI } from "@/lib/types"

interface GlobalIndicatorsProps {
  globalKPI: GlobalKPI
  title: string
  variant: "realtime" | "period"
}

export function GlobalIndicators({ globalKPI, title, variant }: GlobalIndicatorsProps) {
  const bgColor = variant === "realtime" ? "bg-teal-700" : "bg-teal-800"

  // Calculate total downtime
  const totalTempsArret = globalKPI.presses.reduce((sum, p) => sum + p.tempsArret, 0)
  const totalTempsProduction = globalKPI.presses.reduce((sum, p) => {
    const config = globalKPI.presses[0] // Assuming same production time for all
    return sum + 10 * 60 // 10 hours * 60 minutes
  }, 0)
  const cumulTempsArretPercent = (totalTempsArret / totalTempsProduction) * 100
  const cumulTempsArret = `${totalTempsArret.toFixed(2)}/${totalTempsProduction.toFixed(0)} (${cumulTempsArretPercent.toFixed(2)}%)`

  return (
    <div className="space-y-2">
      <h3 className="text-center text-sm font-semibold text-white">{title}</h3>
      <div className="space-y-1">
        {/* TRS */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-gray-200">TRS</span>
          <div className={`${bgColor} min-w-[140px] px-3 py-1 text-center text-sm font-semibold text-white`}>
            {(globalKPI.trs_global * 100).toFixed(2)}%
          </div>
        </div>

        {/* Total pièces bonnes */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-gray-200">Total pièces bonnes</span>
          <div className={`${bgColor} min-w-[140px] px-3 py-1 text-center text-sm font-semibold text-white`}>
            {globalKPI.totalPiecesBonnes.toFixed(0)}
          </div>
        </div>

        {/* Consommation matière */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-gray-200">Consommation matière</span>
          <div className={`${bgColor} min-w-[140px] px-3 py-1 text-center text-sm font-semibold text-white`}>
            {globalKPI.presses.reduce((sum, p) => sum + p.consommationMatiere, 0).toFixed(0)}
          </div>
        </div>

        {/* Cumul temps arrêt */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-gray-200">Cumul temps arrêt</span>
          <div className={`${bgColor} min-w-[140px] px-3 py-1 text-center text-xs font-semibold text-white`}>
            {cumulTempsArret}
          </div>
        </div>
      </div>
    </div>
  )
}
