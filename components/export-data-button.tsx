"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { GlobalKPI } from "@/lib/types"

interface ExportDataButtonProps {
  globalKPI: GlobalKPI
}

export function ExportDataButton({ globalKPI }: ExportDataButtonProps) {
  const handleExport = () => {
    // Prepare CSV data
    const headers = [
      "Press ID",
      "TRS (%)",
      "Disponibilité (%)",
      "Performance (%)",
      "Qualité (%)",
      "Pièces Bonnes",
      "Pièces Mauvaises",
      "Total Pièces",
      "Consommation Matière",
      "Temps Exécution (min)",
      "Temps Arrêt (min)",
      "Statut Machine",
    ]

    const rows = globalKPI.presses.map((press) => [
      press.pressId,
      (press.trs * 100).toFixed(2),
      (press.disponibilite * 100).toFixed(2),
      (press.performance * 100).toFixed(2),
      (press.qualite * 100).toFixed(2),
      press.nbPiecesBonnes.toFixed(0),
      press.nbPiecesMauvaises.toFixed(0),
      press.nbPiecesTotales.toFixed(0),
      press.consommationMatiere.toFixed(2),
      press.tempsExecution.toFixed(2),
      press.tempsArret.toFixed(2),
      press.machineStatus,
    ])

    // Add global summary
    rows.push([])
    rows.push([
      "GLOBAL",
      (globalKPI.trs_global * 100).toFixed(2),
      (globalKPI.disponibilite_global * 100).toFixed(2),
      (globalKPI.performance_global * 100).toFixed(2),
      (globalKPI.qualite_global * 100).toFixed(2),
      globalKPI.totalPiecesBonnes.toFixed(0),
      globalKPI.totalPiecesMauvaises.toFixed(0),
      globalKPI.totalPieces.toFixed(0),
      "-",
      "-",
      "-",
      "-",
    ])

    // Create CSV content
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `production_report_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button variant="outline" onClick={handleExport} className="gap-2 bg-transparent">
      <Download className="h-4 w-4" />
      Exporter CSV
    </Button>
  )
}
