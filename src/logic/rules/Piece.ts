import { BoardState, PieceType, Side } from '../types'

export abstract class Piece {
  type: PieceType
  side: Side

  constructor(type: PieceType, side: Side) {
    this.type = type
    this.side = side
  }

  abstract getValidMoves(
    board: BoardState,
    x: number,
    y: number
  ): Array<[number, number]>

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

  protected isBlocked(board: BoardState, x: number, y: number): boolean {
    return !!board[y]?.[x]
  }

  protected isIllegalCapture(target: Piece | null): boolean {
    return target?.type === 'general'
  }

  protected getStepMoves(
    board: BoardState,
    x: number,
    y: number,
    directions: [number, number][]
  ): [number, number][] {
    const moves: [number, number][] = []

    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy

      if (!this.isInsideBoard(nx, ny)) continue

      const target = board[ny][nx]
      if (!target || !this.sameSide(target)) {
        moves.push([nx, ny])
      }
    }

    return moves
  }

  protected isFlyingGeneralViolated(
    board: BoardState,
    from: [number, number],
    to: [number, number]
  ): boolean {
    const newBoard: BoardState = board.map((row) => row.slice())
    const movingPiece = board[from[1]][from[0]]
    newBoard[from[1]][from[0]] = null
    newBoard[to[1]][to[0]] = movingPiece

    for (let x = 0; x < 9; x++) {
      let redY: number | null = null
      let blackY: number | null = null

      for (let y = 0; y < 10; y++) {
        const p = newBoard[y][x]
        if (!p) continue
        if (p.type === 'general') {
          if (p.side === 'red') redY = y
          else blackY = y
        }
      }

      if (redY !== null && blackY !== null) {
        const [minY, maxY] = [Math.min(redY, blackY), Math.max(redY, blackY)]
        let blocked = false
        for (let y = minY + 1; y < maxY; y++) {
          if (newBoard[y][x]) {
            blocked = true
            break
          }
        }
        if (!blocked) return true
      }
    }

    return false
  }

  protected blocksDueToGeneralCapture(
    board: BoardState,
    positions: [number, number][]
  ): boolean {
    return positions.some(([x, y]) => {
      const target = board[y][x]
      return target?.type === 'general' && !this.sameSide(target)
    })
  }
}
