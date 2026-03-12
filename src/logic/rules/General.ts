import { Piece } from './Piece'
import { BoardState, Side } from '../types'

export class General extends Piece {
  constructor(side: Side) {
    super('general', side)
  }

  getPseudoMoves(board: BoardState, x: number, y: number): [number, number][] {
    const moves: [number, number][] = []

    const directions: [number, number][] = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]

    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy

      if (
        this.isInsideBoard(nx, ny) &&
        this.isInPalace(nx, ny) &&
        !this.sameSide(board[ny][nx])
      ) {
        moves.push([nx, ny])
      }
    }

    return moves
  }
}
