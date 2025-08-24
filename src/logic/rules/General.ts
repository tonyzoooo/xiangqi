import { Piece } from './Piece'
import { BoardState, Side } from '../types'

export class General extends Piece {
  constructor(side: Side) {
    super('general', side)
  }

  getValidMoves(board: BoardState, x: number, y: number): [number, number][] {
    const moves: [number, number][] = []

    const directions: [number, number][] = [
      [0, -1], // up
      [0, 1], // down
      [-1, 0], // left
      [1, 0], // right
    ]

    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy

      if (
        this.isInsideBoard(nx, ny) &&
        this.isInPalace(nx, ny) &&
        this.sameSide(board[ny][nx]) !== true &&
        !this.isFlyingGeneralViolated(board, [x, y], [nx, ny])
      ) {
        moves.push([nx, ny])
      }
    }

    return moves
  }
}
