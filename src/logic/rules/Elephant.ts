import { BoardState, Side } from '../types'
import { Piece } from './Piece'

export class Elephant extends Piece {
  constructor(side: Side) {
    super('elephant', side)
  }

  getValidMoves(board: BoardState, x: number, y: number): [number, number][] {
    const moves: [number, number][] = []

    const directions: [number, number][] = [
      [2, 2],
      [2, -2],
      [-2, 2],
      [-2, -2],
    ]

    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy
      const mx = x + dx / 2
      const my = y + dy / 2

      const target = board[ny]?.[nx]
      const mid = board[my]?.[mx]

      if (
        this.isInsideBoard(nx, ny) &&
        !mid &&
        !this.sameSide(target) &&
        !this.hasCrossedRiver(ny) &&
        !this.isFlyingGeneralViolated(board, [x, y], [nx, ny])
      ) {
        moves.push([nx, ny])
      }
    }

    return moves
  }
}
