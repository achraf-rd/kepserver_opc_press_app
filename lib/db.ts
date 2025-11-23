import mysql from "mysql2/promise"

let pool: mysql.Pool | null = null

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number.parseInt(process.env.MYSQL_PORT || "3306", 10),
      user: process.env.MYSQL_USER ,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  }
  return pool
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const pool = getPool()
  const [rows] = await pool.execute(sql, params)
  return rows as T
}

export async function safeQuery<T = any>(
  sql: string,
  params?: any[],
): Promise<{ data: T | null; error: string | null }> {
  try {
    const pool = getPool()
    const [rows] = await pool.execute(sql, params)
    return { data: rows as T, error: null }
  } catch (error) {
    console.error("Database query error:", error)
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown database error",
    }
  }
}

export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const pool = getPool()
    const [rows] = await pool.execute(
      "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?",
      [process.env.MYSQL_DATABASE , tableName],
    )
    return (rows as any)[0].count > 0
  } catch (error) {
    console.error("Error checking table existence:", error)
    return false
  }
}
