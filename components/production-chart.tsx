"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { PressKPI } from "@/lib/types"

interface ProductionChartProps {
  presses: PressKPI[]
}

export function ProductionChart({ presses }: ProductionChartProps) {
  const data = presses.map((press) => ({
    name: press.pressId.toUpperCase(),
    "Pièces Bonnes": press.nbPiecesBonnes,
    "Pièces Mauvaises": press.nbPiecesMauvaises,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Production par Presse</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="Pièces Bonnes" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Pièces Mauvaises" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
