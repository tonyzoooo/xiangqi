import { BoardState, Piece, PieceType } from './types'

export function createEmptyBoard(): BoardState {
  return Array.from({ length: 10 }, () => Array<Piece | null>(9).fill(null))
}

export function createInitialBoard(): BoardState {
  const board = createEmptyBoard()

  const red: Piece['side'] = 'red'
  const black: Piece['side'] = 'black'

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
    board[0][col] = { type, side: black }
    board[9][col] = { type, side: red }
  })

  board[2][1] = { type: 'cannon', side: black }
  board[2][7] = { type: 'cannon', side: black }
  board[7][1] = { type: 'cannon', side: red }
  board[7][7] = { type: 'cannon', side: red }

  for (let col = 0; col < 9; col += 2) {
    board[3][col] = { type: 'soldier', side: black }
    board[6][col] = { type: 'soldier', side: red }
  }

  return board
}
