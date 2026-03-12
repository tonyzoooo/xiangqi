import { BoardState, PieceType, Side } from '../types'

export abstract class Piece {
  type: PieceType
  side: Side

  constructor(type: PieceType, side: Side) {
    this.type = type
    this.side = side
  }

  abstract getPseudoMoves(
    board: BoardState,
    x: number,
    y: number
  ): Array<[number, number]>

  getValidMoves(board: BoardState, x: number, y: number): [number, number][] {
    return this.getPseudoMoves(board, x, y).filter(([nx, ny]) => {
      const sim = this.simulateMove(board, [x, y], [nx, ny])
      return !this.isGeneralThreatened(sim, this.side)
    })
  }

  protected simulateMove(
    board: BoardState,
    from: [number, number],
    to: [number, number]
  ): BoardState {
    const [fx, fy] = from
    const [tx, ty] = to
    const newBoard = board.map((row) => [...row])
    newBoard[ty][tx] = newBoard[fy][fx]
    newBoard[fy][fx] = null
    return newBoard
  }

  protected isInsideBoard(x: number, y: number): boolean {
    return x >= 0 && x < 9 && y >= 0 && y < 10
  }

  protected isInPalace(x: number, y: number): boolean {
    const inX = x >= 3 && x <= 5
    const inY = this.side === 'red' ? y >= 7 && y <= 9 : y >= 0 && y <= 2
    return inX && inY
  }

  protected hasCrossedRiver(y: number): boolean {
    return this.side === 'red' ? y <= 4 : y >= 5
  }

  protected sameSide(target?: Piece | null): boolean {
    return !!target && target.side === this.side
  }

  protected isGeneralThreatened(board: BoardState, side: Side): boolean {
    let gx = -1,
      gy = -1

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const piece = board[y][x]
        if (piece?.type === 'general' && piece.side === side) {
          gx = x
          gy = y
          break
        }
      }
      if (gx !== -1) break
    }

    if (gx === -1) return false

    // Check if any enemy piece can reach the general via pseudo moves
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const piece = board[y][x]
        if (!piece || piece.side === side) continue
        const moves = piece.getPseudoMoves(board, x, y)
        if (moves.some(([mx, my]) => mx === gx && my === gy)) return true
      }
    }

    // Flying generals: two generals face each other in same column with no pieces between
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const piece = board[y][x]
        if (piece?.type === 'general' && piece.side !== side && x === gx) {
          const [minY, maxY] = [Math.min(gy, y), Math.max(gy, y)]
          let blocked = false
          for (let cy = minY + 1; cy < maxY; cy++) {
            if (board[cy][x]) {
              blocked = true
              break
            }
          }
          if (!blocked) return true
        }
      }
    }

    return false
  }
}
