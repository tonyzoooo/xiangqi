import { BoardState, Side } from '../types'
import { Piece } from './Piece'

export class Chariot extends Piece {
  constructor(side: Side) {
    super('chariot', side)
  }

  getPseudoMoves(board: BoardState, x: number, y: number): [number, number][] {
    const directions: [number, number][] = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]

    const moves: [number, number][] = []

    for (const [dx, dy] of directions) {
      let nx = x + dx
      let ny = y + dy

      while (this.isInsideBoard(nx, ny)) {
        const target = board[ny][nx]

        if (!this.sameSide(target)) {
          moves.push([nx, ny])
        }

        if (target) break
        nx += dx
        ny += dy
      }
    }

    return moves
  }
}
