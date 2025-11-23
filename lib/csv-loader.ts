import fs from "fs"
import { ClientSegmentRoot } from "next/dist/client/components/client-segment"
import path from "path"

export interface PressConfig {
  press_id: string
  temps_cycle_ideal: number
  temps_production_planifie: number // hours
  temps_arret: number // hours
  temps_execution: number // hours
  disponibilite: number // percentage
  production_objectif: number
  puissance_nominale: number
  unite: string
}

let cachedConfig: Map<string, PressConfig> | null = null

export function loadPressConfig(): Map<string, PressConfig> {
  if (cachedConfig) {
    return cachedConfig
  }

  const csvPath = path.join(process.cwd(), "public", "data", "info_presses.csv")
  const csvContent = fs.readFileSync(csvPath, "utf-8")
  const lines = csvContent.trim().split("\n")
  const headers = lines[0].split(",")

  const config = new Map<string, PressConfig>()

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",")
    const press: any = {}

    headers.forEach((header, index) => {
      const value = values[index]
      if (header === "press_id" || header === "unite") {
        press[header] = value
      } else {
        press[header] = Number.parseFloat(value)
      }
    })

    config.set(press.press_id, press as PressConfig)
  }

  cachedConfig = config
  return config
}

export function getPressConfig(pressId: string): PressConfig | undefined {
  const config = loadPressConfig()
  return config.get(pressId)
}
