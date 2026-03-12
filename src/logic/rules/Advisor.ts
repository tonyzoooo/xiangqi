import { Piece } from './Piece'
import type { BoardState, Side } from '../types'

export class Advisor extends Piece {
  constructor(side: Side) {
    super('advisor', side)
  }

  getPseudoMoves(board: BoardState, x: number, y: number): [number, number][] {
    const directions: [number, number][] = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
    ]

    return directions
      .map(([dx, dy]) => [x + dx, y + dy] as [number, number])
      .filter(
        ([nx, ny]) =>
          this.isInsideBoard(nx, ny) &&
          this.isInPalace(nx, ny) &&
          !this.sameSide(board[ny][nx])
      )
  }
}
