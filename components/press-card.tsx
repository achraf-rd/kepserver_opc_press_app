"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KPIGauge } from "./kpi-gauge"
import { PressStatusIndicator } from "./press-status-indicator"
import type { PressKPI } from "@/lib/types"
import { Activity, Package, AlertTriangle, Droplet } from "lucide-react"

interface PressCardProps {
  kpi: PressKPI
}

export function PressCard({ kpi }: PressCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold uppercase">{kpi.pressId}</CardTitle>
          <PressStatusIndicator status={kpi.machineStatus} />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Main TRS Display */}
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">TRS (OEE)</div>
              <div className="text-5xl font-bold text-primary">{(kpi.trs * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* KPI Gauges Grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            <KPIGauge title="Disponibilité" value={kpi.disponibilite} thresholds={{ good: 0.85, warning: 0.7 }} />
            <KPIGauge title="Performance" value={kpi.performance} thresholds={{ good: 0.9, warning: 0.75 }} />
            <KPIGauge title="Qualité" value={kpi.qualite} thresholds={{ good: 0.95, warning: 0.85 }} />
          </div>

          {/* Production Stats */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-950">
                <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Pièces Bonnes</div>
                <div className="text-2xl font-bold">{kpi.nbPiecesBonnes.toFixed(0)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-950">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Pièces Mauvaises</div>
                <div className="text-2xl font-bold">{kpi.nbPiecesMauvaises.toFixed(0)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-950">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Temps Exécution</div>
                <div className="text-2xl font-bold">{kpi.tempsExecution.toFixed(0)} min</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-950">
                <Droplet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Consommation</div>
                <div className="text-2xl font-bold">{kpi.consommationMatiere.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
