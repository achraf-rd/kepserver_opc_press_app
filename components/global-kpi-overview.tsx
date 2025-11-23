"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KPIGauge } from "./kpi-gauge"
import type { GlobalKPI } from "@/lib/types"
import { Factory, Package, AlertTriangle, TrendingUp } from "lucide-react"

interface GlobalKPIOverviewProps {
  globalKPI: GlobalKPI
}

export function GlobalKPIOverview({ globalKPI }: GlobalKPIOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Main Global TRS Display */}
      <Card className="overflow-hidden border-2 border-primary">
        <CardHeader className="bg-primary/10">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Factory className="h-6 w-6" />
            TRS Global de la Ligne de Production
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-7xl font-bold text-primary">{(globalKPI.trs_global * 100).toFixed(1)}%</div>
            <div className="mt-2 text-lg text-muted-foreground">Taux de Rendement Synthétique</div>
          </div>
        </CardContent>
      </Card>

      {/* Global KPI Gauges */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPIGauge
          title="Disponibilité Globale"
          value={globalKPI.disponibilite_global}
          thresholds={{ good: 0.85, warning: 0.7 }}
        />
        <KPIGauge
          title="Performance Globale"
          value={globalKPI.performance_global}
          thresholds={{ good: 0.9, warning: 0.75 }}
        />
        <KPIGauge title="Qualité Globale" value={globalKPI.qualite_global} thresholds={{ good: 0.95, warning: 0.85 }} />
      </div>

      {/* Global Production Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-950">
              <Package className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Pièces Bonnes</div>
              <div className="text-3xl font-bold">{globalKPI.totalPiecesBonnes.toFixed(0)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-950">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Pièces Mauvaises</div>
              <div className="text-3xl font-bold">{globalKPI.totalPiecesMauvaises.toFixed(0)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-950">
              <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Production Totale</div>
              <div className="text-3xl font-bold">{globalKPI.totalPieces.toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">
                Taux de qualité: {((globalKPI.totalPiecesBonnes / globalKPI.totalPieces) * 100).toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
