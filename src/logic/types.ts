import { Piece } from './rules'

export type Side = 'red' | 'black'

export type PieceType =
  | 'chariot'
  | 'horse'
  | 'cannon'
  | 'elephant'
  | 'advisor'
  | 'general'
  | 'soldier'

export type BoardState = (Piece | null)[][]

export { Piece }

export type Move = {
  from: [number, number]
  to: [number, number]
  piece: PieceType
  captured?: PieceType
  capturedSide?: Side
}
