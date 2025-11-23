"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { PressKPI } from "@/lib/types"

interface TRSComparisonChartProps {
  presses: PressKPI[]
}

export function TRSComparisonChart({ presses }: TRSComparisonChartProps) {
  const data = presses.map((press) => ({
    name: press.pressId.toUpperCase(),
    Disponibilité: (press.disponibilite * 100).toFixed(1),
    Performance: (press.performance * 100).toFixed(1),
    Qualité: (press.qualite * 100).toFixed(1),
    TRS: (press.trs * 100).toFixed(1),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparaison TRS et KPIs</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" label={{ value: "%", angle: -90, position: "insideLeft" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="Disponibilité" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Performance" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Qualité" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="TRS" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
