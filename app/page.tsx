"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PressIndicators } from "@/components/press-indicators"
import { GlobalIndicators } from "@/components/global-indicators"
import type { GlobalKPI } from "@/lib/types"
import { RefreshCw, AlertCircle, Database } from "lucide-react"

export default function DashboardPage() {
  const [globalKPI, setGlobalKPI] = useState<GlobalKPI | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [warnings, setWarnings] = useState<string[]>([])
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [startDate, setStartDate] = useState("2025-11-22T00:00")
  const [endDate, setEndDate] = useState("2025-12-06T00:00")

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      setWarnings([])

      const params = new URLSearchParams()
      if (startDate) params.append("start", startDate)
      if (endDate) params.append("end", endDate)

      const response = await fetch(`/api/press/global/kpi?${params.toString()}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Failed to fetch data")
      }

      const data = await response.json()

      if (data.warnings) {
        setWarnings(data.warnings)
      }
      console.log("Fetched global KPI:", data)
      setGlobalKPI(data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return
    // const interval = setInterval(() => {
    fetchData()
    
    // }, 5000)
    // return () => clearInterval(interval)
  }, [autoRefresh])

  if (loading && !globalKPI) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <RefreshCw className="mx-auto h-16 w-16 animate-spin text-teal-600" />
          <p className="mt-4 text-lg font-medium text-slate-700">Chargement des données...</p>
        </div>
      </div>
    )
  }

  if (error && !globalKPI) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md border-red-200 shadow-xl">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h2 className="text-xl font-bold text-slate-900">Erreur de connexion</h2>
            </div>
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Impossible de charger les données</AlertTitle>
              <AlertDescription className="mt-2 text-sm">{error}</AlertDescription>
            </Alert>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="font-medium">Vérifications suggérées:</p>
              <ul className="list-inside list-disc space-y-1 pl-2">
                <li>La base de données MySQL est accessible</li>
                <li>Les tables de presses existent (press1_pb, press1_pm, etc.)</li>
                <li>Les variables d'environnement sont correctement configurées</li>
                <li>Les données sont présentes dans les tables</li>
              </ul>
            </div>
            <Button onClick={fetchData} className="mt-6 w-full bg-teal-600 hover:bg-teal-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!globalKPI) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 p-6 shadow-2xl">
          <div className="flex items-center justify-center gap-3">
            <Database className="h-8 w-8 text-white" />
            <h1 className="text-center text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
              Indicateurs de Performance de la Ligne de Production des Presses
            </h1>
          </div>
        </div>

        {warnings.length > 0 && (
          <Alert className="mb-4 border-yellow-300 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Données partielles</AlertTitle>
            <AlertDescription className="text-sm text-yellow-700">
              Certaines presses n'ont pas pu être chargées: {warnings.join(", ")}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="space-y-4">
            <Card className="border-slate-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <h2 className="mb-6 text-center text-xl font-bold text-slate-800">Définition de la période</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="start-date" className="text-sm font-semibold text-slate-700">
                      Début de la période
                    </Label>
                    <Input
                      id="start-date"
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-2 border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <Label htmlFor="end-date" className="text-sm font-semibold text-slate-700">
                      Fin de la période
                    </Label>
                    <Input
                      id="end-date"
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-2 border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={fetchData}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Appliquer le filtre
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Indicators */}
          <div className="space-y-6">
            <Card className="border-slate-200 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="p-6">
                <h2 className="mb-6 text-center text-xl font-bold text-white">
                  Indicateurs globaux de la ligne de production
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <GlobalIndicators globalKPI={globalKPI} title="Indicateurs en temps réel" variant="realtime" />
                  <GlobalIndicators globalKPI={globalKPI} title="Indicateurs pour la période" variant="period" />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {globalKPI.presses.map((press) => (
                <Card
                  key={press.pressId}
                  className="border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  <CardContent className="p-5">
                    <h2 className="mb-4 text-center text-lg font-bold uppercase text-slate-800">
                      Indicateurs {press.pressId}
                    </h2>

                    <div className="space-y-4">
                      <PressIndicators kpi={press} title="Indicateurs en temps réel" variant="realtime" />
                      <PressIndicators kpi={press} title="Indicateurs pour la période" variant="period" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="lg"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-teal-600 hover:bg-teal-700" : "border-teal-600 text-teal-600 hover:bg-teal-50"}
          >
            <RefreshCw className={`mr-2 h-5 w-5 ${autoRefresh ? "animate-spin" : ""}`} />
            {autoRefresh ? "Actualisation automatique (5s)" : "Actualisation manuelle"}
          </Button>
        </div>
      </div>
    </div>
  )
}
