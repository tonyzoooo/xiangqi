export type Side = 'red' | 'black'

export type PieceType =
  | 'chariot'
  | 'horse'
  | 'cannon'
  | 'elephant'
  | 'advisor'
  | 'general'
  | 'soldier'

export type Piece = {
  type: PieceType
  side: Side
}

export type BoardState = (Piece | null)[][]
