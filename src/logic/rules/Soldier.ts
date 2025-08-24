import { Piece } from './Piece'
import { BoardState, Side } from '../types'

export class Soldier extends Piece {
  constructor(side: Side) {
    super('soldier', side)
  }

  getValidMoves(board: BoardState, x: number, y: number): [number, number][] {
    const moves: [number, number][] = []
    const dir = this.side === 'red' ? -1 : 1
    const forwardY = y + dir

    const candidates: [number, number][] = []

    if (this.isInsideBoard(x, forwardY)) {
      candidates.push([x, forwardY])
    }

    if (this.hasCrossedRiver(y)) {
      if (this.isInsideBoard(x - 1, y)) candidates.push([x - 1, y])
      if (this.isInsideBoard(x + 1, y)) candidates.push([x + 1, y])
    }

    if (this.blocksDueToGeneralCapture(board, candidates)) {
      return []
    }

    for (const [nx, ny] of candidates) {
      const target = board[ny][nx]
      const isSameSide = this.sameSide(target)

      const violatesFlyingGeneral = this.isFlyingGeneralViolated(
        board,
        [x, y],
        [nx, ny]
      )

      if (!isSameSide && !violatesFlyingGeneral) {
        moves.push([nx, ny])
      }
    }

    return moves.filter(([nx, ny]) => {
      const target = board[ny][nx]
      return !this.isIllegalCapture(target)
    })
  }
}
