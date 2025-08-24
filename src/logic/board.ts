import { Cannon, PieceFactory, Soldier } from './rules'
import { BoardState, Piece, PieceType, Side } from './types'

export function createEmptyBoard(): BoardState {
  return Array.from({ length: 10 }, () => Array<Piece | null>(9).fill(null))
}

export function createInitialBoard(): BoardState {
  const board = createEmptyBoard()

  const red: Side = 'red'
  const black: Side = 'black'

  const layout: PieceType[] = [
    'chariot',
    'horse',
    'elephant',
    'advisor',
    'general',
    'advisor',
    'elephant',
    'horse',
    'chariot',
  ]

  layout.forEach((type, col) => {
    board[0][col] = PieceFactory.create(type, black)
    board[9][col] = PieceFactory.create(type, red)
  })

  board[2][1] = new Cannon(black)
  board[2][7] = new Cannon(black)
  board[7][1] = new Cannon(red)
  board[7][7] = new Cannon(red)

  for (let col = 0; col < 9; col += 2) {
    board[3][col] = new Soldier(black)
    board[6][col] = new Soldier(red)
  }

  return board
}
