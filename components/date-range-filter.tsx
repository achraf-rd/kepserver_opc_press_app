"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, X } from "lucide-react"

interface DateRangeFilterProps {
  onFilterChange: (start: string | null, end: string | null) => void
}

export function DateRangeFilter({ onFilterChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleApply = () => {
    onFilterChange(startDate || null, endDate || null)
    setIsOpen(false)
  }

  const handleReset = () => {
    setStartDate("")
    setEndDate("")
    onFilterChange(null, null)
  }

  const handleQuickFilter = (hours: number) => {
    const end = new Date()
    const start = new Date(end.getTime() - hours * 60 * 60 * 1000)
    const startStr = start.toISOString().slice(0, 16)
    const endStr = end.toISOString().slice(0, 16)
    setStartDate(startStr)
    setEndDate(endStr)
    onFilterChange(startStr, endStr)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="gap-2">
        <Calendar className="h-4 w-4" />
        Filtrer par période
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 z-50 w-80 shadow-lg">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Filtrer par période</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Quick filters */}
              <div>
                <Label className="mb-2 block text-sm">Filtres rapides</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleQuickFilter(1)}>
                    Dernière heure
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickFilter(8)}>
                    8 heures
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickFilter(24)}>
                    24 heures
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickFilter(168)}>
                    7 jours
                  </Button>
                </div>
              </div>

              {/* Custom date range */}
              <div>
                <Label htmlFor="start-date" className="mb-2 block text-sm">
                  Date de début
                </Label>
                <input
                  id="start-date"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="end-date" className="mb-2 block text-sm">
                  Date de fin
                </Label>
                <input
                  id="end-date"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleApply} className="flex-1">
                  Appliquer
                </Button>
                <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
                  Réinitialiser
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
