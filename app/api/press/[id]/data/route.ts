import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { DataPoint } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pressId = params.id
    const searchParams = request.nextUrl.searchParams
    const start = searchParams.get("start")
    const end = searchParams.get("end")
    const table = searchParams.get("table") // pb, pm, mem, or cm

    // Validate press ID
    if (!["press1", "press2", "press3", "press4"].includes(pressId)) {
      return NextResponse.json({ error: "Invalid press ID" }, { status: 400 })
    }

    // Validate table
    if (!table || !["pb", "pm", "mem", "cm"].includes(table)) {
      return NextResponse.json({ error: "Invalid table parameter. Must be: pb, pm, mem, or cm" }, { status: 400 })
    }

    // Build date filter
    let dateFilter = ""
    const params_array: any[] = []

    if (start && end) {
      dateFilter = "WHERE DateTime BETWEEN ? AND ?"
      params_array.push(start, end)
    } else if (start) {
      dateFilter = "WHERE DateTime >= ?"
      params_array.push(start)
    } else if (end) {
      dateFilter = "WHERE DateTime <= ?"
      params_array.push(end)
    }

    // Fetch data
    const data = await query<DataPoint[]>(
      `SELECT * FROM ${pressId}_${table} ${dateFilter} ORDER BY DateTime`,
      params_array,
    )

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching press data:", error)
    return NextResponse.json(
      { error: "Failed to fetch press data", details: (error as Error).message },
      { status: 500 },
    )
  }
}
