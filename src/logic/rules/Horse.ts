import { BoardState, Side } from '../types'
import { Piece } from './Piece'

export class Horse extends Piece {
  constructor(side: Side) {
    super('horse', side)
  }

  getValidMoves(board: BoardState, x: number, y: number): [number, number][] {
    const moves: [number, number][] = []

    const directions: {
      block: [number, number]
      move: [number, number]
    }[] = [
      { block: [0, -1], move: [-1, -2] },
      { block: [0, -1], move: [1, -2] },
      { block: [0, 1], move: [-1, 2] },
      { block: [0, 1], move: [1, 2] },
      { block: [-1, 0], move: [-2, -1] },
      { block: [-1, 0], move: [-2, 1] },
      { block: [1, 0], move: [2, -1] },
      { block: [1, 0], move: [2, 1] },
    ]

    for (const { block, move } of directions) {
      const [bx, by] = [x + block[0], y + block[1]]
      const [nx, ny] = [x + move[0], y + move[1]]

      if (this.isInsideBoard(nx, ny) && !board[by]?.[bx]) {
        const target = board[ny][nx]
        if (
          !this.sameSide(target) &&
          !this.isFlyingGeneralViolated(board, [x, y], [nx, ny])
        ) {
          moves.push([nx, ny])
        }
      }
    }

    if (this.blocksDueToGeneralCapture(board, moves)) {
      return []
    }

    return moves.filter(([nx, ny]) => {
      const target = board[ny][nx]
      return !this.isIllegalCapture(target)
    })
  }
}
