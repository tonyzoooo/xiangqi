import { Piece } from './Piece'
import type { BoardState, Side } from '../types'

export class Advisor extends Piece {
  constructor(side: Side) {
    super('advisor', side)
  }

  getValidMoves(board: BoardState, x: number, y: number): [number, number][] {
    const directions: [number, number][] = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
    ]

    const candidates = directions
      .map(([dx, dy]) => [x + dx, y + dy] as [number, number])
      .filter(
        ([nx, ny]) => this.isInsideBoard(nx, ny) && this.isInPalace(nx, ny)
      )

    const moves = candidates.filter(([nx, ny]) => {
      const target = board[ny][nx]
      return (
        !this.sameSide(target) &&
        !this.isFlyingGeneralViolated(board, [x, y], [nx, ny])
      )
    })

    return moves
  }
}
