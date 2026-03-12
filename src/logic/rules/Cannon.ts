import { BoardState, Side } from '../types'
import { Piece } from './Piece'

export class Cannon extends Piece {
  constructor(side: Side) {
    super('cannon', side)
  }

  getPseudoMoves(board: BoardState, x: number, y: number): [number, number][] {
    const moves: [number, number][] = []
    const dirs: [number, number][] = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]

    for (const [dx, dy] of dirs) {
      let jumped = false

      for (let i = 1; i < 10; i++) {
        const nx = x + dx * i
        const ny = y + dy * i
        if (!this.isInsideBoard(nx, ny)) break

        const target = board[ny][nx]

        if (!jumped) {
          if (!target) {
            moves.push([nx, ny])
          } else {
            jumped = true
          }
        } else {
          if (target) {
            if (!this.sameSide(target)) {
              moves.push([nx, ny])
            }
            break
          }
        }
      }
    }

    return moves
  }
}
