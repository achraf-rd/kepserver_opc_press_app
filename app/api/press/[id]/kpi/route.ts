import { type NextRequest, NextResponse } from "next/server"
import { safeQuery, tableExists } from "@/lib/db"
import type { DataPoint } from "@/lib/types"
import { calculatePressKPI } from "@/lib/kpi-calculator"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pressId = params.id

    if (!["press1", "press2", "press3", "press4"].includes(pressId)) {
      return NextResponse.json({ error: "Invalid press ID" }, { status: 400 })
    }

    const searchParams = request.nextUrl.searchParams
    const start = searchParams.get("start")
    const end = searchParams.get("end")

    const tables = [`${pressId}_pb`, `${pressId}_pm`, `${pressId}_mem`, `${pressId}_cm`]
    for (const table of tables) {
      const exists = await tableExists(table)
      if (!exists) {
        return NextResponse.json(
          { error: `Table ${table} does not exist`, details: "Please create the required database tables" },
          { status: 404 },
        )
      }
    }

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

    const { data: pbData, error: pbError } = await safeQuery<DataPoint[]>(
      `SELECT * FROM ${pressId}_pb ${dateFilter} ORDER BY _TIMESTAMP`,
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
      return NextResponse.json(
        {
          error: "Database query failed",
          details: pbError || pmError || memError || cmError,
        },
        { status: 500 },
      )
    }

    if (!pbData || !pmData || !memData || !cmData) {
      return NextResponse.json(
        { error: "No data available", details: "One or more tables returned no data" },
        { status: 404 },
      )
    }

    // Calculate KPIs
    const kpi = calculatePressKPI(pressId, pbData, pmData, memData, cmData)

    return NextResponse.json(kpi)
  } catch (error) {
    console.error("Error fetching press KPI:", error)
    return NextResponse.json({ error: "Failed to fetch press KPI", details: (error as Error).message }, { status: 500 })
  }
}
