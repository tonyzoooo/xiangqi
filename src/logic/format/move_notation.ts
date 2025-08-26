import { Move } from '..'

export function formatMove(move: Move, side: 'red' | 'black'): string {
  const pieceMap: Record<string, string> = {
    general: 'G',
    advisor: 'A',
    elephant: 'E',
    horse: 'H',
    chariot: 'R',
    cannon: 'C',
    soldier: 'S',
  }

  const [fx, fy] = move.from
  const [tx, ty] = move.to
  const file = side === 'red' ? fx + 1 : 9 - fx
  const dest = side === 'red' ? tx + 1 : 9 - tx
  const piece = pieceMap[move.piece] ?? '?'

  const dir =
    fy === ty
      ? '.'
      : side === 'red'
        ? ty < fy
          ? '+'
          : '-'
        : ty > fy
          ? '+'
          : '-'

  const value = fy === ty ? dest : Math.abs(ty - fy)

  return `${piece}${file}${dir}${value}`
}
