"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PressCard } from "./press-card"
import type { PressKPI } from "@/lib/types"

interface PressTabsProps {
  presses: PressKPI[]
}

export function PressTabs({ presses }: PressTabsProps) {
  return (
    <Tabs defaultValue="press1" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {presses.map((press) => (
          <TabsTrigger key={press.pressId} value={press.pressId} className="uppercase">
            {press.pressId}
          </TabsTrigger>
        ))}
      </TabsList>
      {presses.map((press) => (
        <TabsContent key={press.pressId} value={press.pressId} className="mt-6">
          <PressCard kpi={press} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
