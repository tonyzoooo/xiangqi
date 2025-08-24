import { BoardState, Side } from '../types'
import { Piece } from './Piece'

export class Cannon extends Piece {
  constructor(side: Side) {
    super('cannon', side)
  }

  getValidMoves(board: BoardState, x: number, y: number): [number, number][] {
    const directions: [number, number][] = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]

    const candidates: [number, number][] = []

    for (const [dx, dy] of directions) {
      let hasJumped = false

      for (let i = 1; i < 10; i++) {
        const nx = x + dx * i
        const ny = y + dy * i

        if (!this.isInsideBoard(nx, ny)) break

        const target = board[ny][nx]

        if (!hasJumped) {
          if (!target) {
            candidates.push([nx, ny])
          } else {
            hasJumped = true
          }
        } else {
          if (target) {
            if (!this.sameSide(target)) {
              candidates.push([nx, ny])
            }
            break
          }
        }
      }
    }

    if (this.blocksDueToGeneralCapture(board, candidates)) {
      return []
    }

    const filtered = candidates.filter(([nx, ny]) => {
      const target = board[ny][nx]
      return (
        !this.isIllegalCapture(target) &&
        !this.isFlyingGeneralViolated(board, [x, y], [nx, ny])
      )
    })

    console.log('final moves', filtered)
    return filtered
  }
}
