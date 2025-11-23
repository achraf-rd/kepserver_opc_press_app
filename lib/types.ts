export interface DataPoint {
  id: number
  _NAME: string
  _NUMERICID: number
  _VALUE: string
  _TIMESTAMP: Date
  _QUALITY: number
}

export interface PressKPI {
  pressId: string
  disponibilite: number
  performance: number
  qualite: number
  trs: number
  nbPiecesBonnes: number
  nbPiecesMauvaises: number
  nbPiecesTotales: number
  consommationMatiere: number
  tempsArret: number
  tempsExecution: number
  machineStatus: "running" | "stopped"
  cumulTempsArret: string
}

export interface GlobalKPI {
  trs_global: number
  disponibilite_global: number
  performance_global: number
  qualite_global: number
  totalPiecesBonnes: number
  totalPiecesMauvaises: number
  totalPieces: number
  presses: PressKPI[]
}
