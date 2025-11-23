import { type NextRequest, NextResponse } from "next/server"
import { safeQuery, tableExists } from "@/lib/db"
import type { DataPoint } from "@/lib/types"
import { calculatePressKPI, calculateGlobalKPI } from "@/lib/kpi-calculator"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const start = searchParams.get("start")
    const end = searchParams.get("end")

    let dateFilter = ""
    const params_array: any[] = []

    if (start && end) {
      dateFilter = "WHERE _TIMESTAMP BETWEEN ? AND ?"
      params_array.push(start, end)
    } else if (start) {
      dateFilter = "WHERE _TIMESTAMP >= ?"
      params_array.push(start)
    } else if (end) {
      dateFilter = "WHERE _TIMESTAMP <= ?"
      params_array.push(end)
    }

    const pressIds = ["press1", "press2", "press3", "press4"]
    const pressKPIs = []
    const errors = []

    for (const pressId of pressIds) {
      try {
        // Check if tables exist  
        const tables = [`${pressId}_pb`, `${pressId}_pm`, `${pressId}_mem`, `${pressId}_cm`]
        let allTablesExist = true

        for (const table of tables) {
          const exists = await tableExists(table)
          if (!exists) {
            allTablesExist = false
            errors.push(`Table ${table} does not exist`)
            break
          }
        }

        if (!allTablesExist) {
          continue
        }

        const pbQuery = `SELECT * FROM ${pressId}_pb ${dateFilter} ORDER BY _TIMESTAMP`
        console.log(pbQuery, params_array)
        const { data: pbData, error: pbError } = await safeQuery<DataPoint[]>(
          pbQuery,
          params_array,
        )
        const { data: pmData, error: pmError } = await safeQuery<DataPoint[]>(
          `SELECT * FROM ${pressId}_pm ${dateFilter} ORDER BY _TIMESTAMP`,
          params_array,
        )

        const { data: memData, error: memError } = await safeQuery<DataPoint[]>(
          `SELECT * FROM ${pressId}_mem ${dateFilter} ORDER BY _TIMESTAMP`,
          params_array,
        )

        const { data: cmData, error: cmError } = await safeQuery<DataPoint[]>(
          `SELECT * FROM ${pressId}_cm ${dateFilter} ORDER BY _TIMESTAMP`,
          params_array,
        )
        
        if (pbError || pmError || memError || cmError) {
          errors.push(`${pressId}: ${pbError || pmError || memError || cmError}`)
          continue
        }

        if (!pbData || !pmData || !memData || !cmData) {
          errors.push(`${pressId}: No data available`)
          continue
        }

        const kpi = calculatePressKPI(pressId, pbData, pmData, memData, cmData)
        console.log(`Calculated KPI for ${pressId}:`, kpi)
        pressKPIs.push(kpi)
      } catch (error) {
        console.error(`Error processing ${pressId}:`, error)
        errors.push(`${pressId}: ${(error as Error).message}`)
      }
    }

    if (pressKPIs.length === 0) {
      return NextResponse.json(
        {
          error: "No press data available",
          details: errors.join(", "),
        },
        { status: 404 },
      )
    }

    // Calculate global KPIs
    const globalKPI = calculateGlobalKPI(pressKPIs)

    // Include warnings if some presses failed
    if (errors.length > 0) {
      return NextResponse.json({
        ...globalKPI,
        warnings: errors,
      })
    }

    return NextResponse.json(globalKPI)
  } catch (error) {
    console.error("Error fetching global KPI:", error)
    return NextResponse.json(
      { error: "Failed to fetch global KPI", details: (error as Error).message },
      { status: 500 },
    )
  }
}
