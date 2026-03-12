import { Piece } from './Piece'
import { BoardState, Side } from '../types'

export class Soldier extends Piece {
  constructor(side: Side) {
    super('soldier', side)
  }

  getPseudoMoves(board: BoardState, x: number, y: number): [number, number][] {
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

    for (const [nx, ny] of candidates) {
      const target = board[ny][nx]
      if (!this.sameSide(target)) {
        moves.push([nx, ny])
      }
    }

    return moves
  }
}
