import type { DataPoint, PressKPI } from "./types"
import { getPressConfig } from "./csv-loader"

/**
 * Calculate downtime in minutes from machine status data
 * Counts consecutive periods where _VALUE == 0
 */
export function getDowntimeMinutes(memData: DataPoint[]): number {
  if (memData.length === 0) return 0

  let totalDowntime = 0

  const sortedData = [...memData].sort((a, b) => new Date(a._TIMESTAMP).getTime() - new Date(b._TIMESTAMP).getTime())

  for (let i = 0; i < sortedData.length - 1; i++) {
    const current = sortedData[i]
    const next = sortedData[i + 1]

    const currentValue = Number.parseFloat(current._VALUE)
    if (currentValue === 0 && current._QUALITY === 1) {
      const duration = (new Date(next._TIMESTAMP).getTime() - new Date(current._TIMESTAMP).getTime()) / (1000 * 60)
      totalDowntime += duration
    }
  }

  // Handle last record if machine is currently stopped
  const lastRecord = sortedData[sortedData.length - 1]
  const lastValue = Number.parseFloat(lastRecord._VALUE)
  if (lastValue === 0 && lastRecord._QUALITY === 1) {
    totalDowntime += 60
  }

  return totalDowntime
}

/**
 * Calculate KPIs for a single press
 */
export function calculatePressKPI(
  pressId: string,
  pbData: DataPoint[],
  pmData: DataPoint[],
  memData: DataPoint[],
  cmData: DataPoint[],
): PressKPI {
  // Get configuration from CSV
  const config = getPressConfig(pressId)
  if (!config) {
    throw new Error(`Configuration not found for ${pressId}`)
  }
  const tempsProductionPlanifie = config.temps_production_planifie * 60 // Convert hours to minutes
  const tempsCycleIdealSeconds = config.temps_cycle_ideal // Cycle time in seconds per piece
  const tempsCycleIdealMinutes = tempsCycleIdealSeconds / 60 // Convert to minutes per piece
  const cadenceTheorique = tempsCycleIdealMinutes > 0 ? (1 / tempsCycleIdealMinutes) : 0 // Theoretical pieces per minute
  const validPbData = pbData.filter((d) => d._QUALITY > 1)
  const validPmData = pmData.filter((d) => d._QUALITY > 1)
  const validMemData = memData.filter((d) => d._QUALITY > 1)
  const validCmData = cmData.filter((d) => d._QUALITY > 1)


  const nbPiecesBonnes = validPbData.length > 0 ? validPbData.reduce((sum, d) => sum + Number.parseFloat(d._VALUE), 0) : 0
  const nbPiecesMauvaises = validPmData.length > 0 ? validPmData.reduce((sum, d) => sum + Number.parseFloat(d._VALUE), 0) : 0
  const consommationMatiere = validCmData.length > 0 ? Number.parseFloat(validCmData[validCmData.length - 1]._VALUE) : 0
  const nbPiecesTotales = nbPiecesBonnes + nbPiecesMauvaises

  // Calculate downtime from actual data
  const tempsArret = getDowntimeMinutes(validMemData)
  // Execution time should be planned time minus downtime
  const tempsExecution = tempsProductionPlanifie - tempsArret

  // 1. Disponibilité (Availability): Actual execution time / Planned production time
  const disponibilite = tempsProductionPlanifie > 0 ? tempsExecution / tempsProductionPlanifie : 0

  // 2. Performance
  const tempsExecutionMin = tempsExecution
  const cadenceReelle = tempsExecutionMin > 0 ? nbPiecesTotales / tempsExecutionMin : 0 // Actual pieces per minute
  const performance = cadenceTheorique > 0 ? Math.min(cadenceReelle / cadenceTheorique, 1) : 0

  // 3. Qualité (Quality)
  const qualite = nbPiecesTotales > 0 ? nbPiecesBonnes / nbPiecesTotales : 0

  // 4. TRS (OEE)
  const trs = disponibilite * performance * qualite

  const cumulTempsArretPercent = (tempsArret / tempsProductionPlanifie) * 100
  const cumulTempsArret = `${tempsArret.toFixed(2)}/${tempsProductionPlanifie.toFixed(0)} (${cumulTempsArretPercent.toFixed(2)}%)`

  const currentStatus =
    validMemData.length > 0
      ? Number.parseFloat(validMemData[validMemData.length - 1]._VALUE) === 1
        ? "running"
        : "stopped"
      : "stopped"

  return {
    pressId,
    disponibilite,
    performance,
    qualite,
    trs,
    nbPiecesBonnes,
    nbPiecesMauvaises,
    nbPiecesTotales,
    consommationMatiere,
    tempsArret,
    tempsExecution,
    machineStatus: currentStatus,
    cumulTempsArret,
  }
}

/**
 * Calculate global KPIs from all presses
 */
export function calculateGlobalKPI(pressKPIs: PressKPI[]) {
  if (pressKPIs.length === 0) {
    return {
      trs_global: 0,
      disponibilite_global: 0,
      performance_global: 0,
      qualite_global: 0,
      totalPiecesBonnes: 0,
      totalPiecesMauvaises: 0,
      totalPieces: 0,
      presses: [],
    }
  }

  // Calculate weighted average based on production volume
  const totalPieces = pressKPIs.reduce((sum, p) => sum + p.nbPiecesTotales, 0)

  let trs_global = 0
  let disponibilite_global = 0
  let performance_global = 0
  let qualite_global = 0

  if (totalPieces > 0) {
    // Weighted by production volume
    trs_global = pressKPIs.reduce((sum, p) => sum + p.trs * p.nbPiecesTotales, 0) / totalPieces

    disponibilite_global = pressKPIs.reduce((sum, p) => sum + p.disponibilite * p.nbPiecesTotales, 0) / totalPieces

    performance_global = pressKPIs.reduce((sum, p) => sum + p.performance * p.nbPiecesTotales, 0) / totalPieces

    qualite_global = pressKPIs.reduce((sum, p) => sum + p.qualite * p.nbPiecesTotales, 0) / totalPieces
  } else {
    // Simple average if no production
    trs_global = pressKPIs.reduce((sum, p) => sum + p.trs, 0) / pressKPIs.length
    disponibilite_global = pressKPIs.reduce((sum, p) => sum + p.disponibilite, 0) / pressKPIs.length
    performance_global = pressKPIs.reduce((sum, p) => sum + p.performance, 0) / pressKPIs.length
    qualite_global = pressKPIs.reduce((sum, p) => sum + p.qualite, 0) / pressKPIs.length
  }

  const totalPiecesBonnes = pressKPIs.reduce((sum, p) => sum + p.nbPiecesBonnes, 0)
  const totalPiecesMauvaises = pressKPIs.reduce((sum, p) => sum + p.nbPiecesMauvaises, 0)

  return {
    trs_global,
    disponibilite_global,
    performance_global,
    qualite_global,
    totalPiecesBonnes,
    totalPiecesMauvaises,
    totalPieces,
    presses: pressKPIs,
  }
}
