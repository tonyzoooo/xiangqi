import { useState } from 'react'

import { Piece } from '@/logic'

export const useSelection = (state: (Piece | null)[][]) => {
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [validMoves, setValidMoves] = useState<[number, number][]>([])
  const [captures, setCaptures] = useState<[number, number][]>([])

  const selectPiece = (x: number, y: number, piece: Piece) => {
    setSelected([x, y])
    const moves = piece.getValidMoves(state, x, y)
    const caps = moves.filter(([mx, my]) => {
      const target = state[my][mx]
      return target && target.side !== piece.side
    })
    setValidMoves(moves)
    setCaptures(caps)
  }

  const clearSelection = () => {
    setSelected(null)
    setValidMoves([])
    setCaptures([])
  }

  return {
    selected,
    validMoves,
    captures,
    selectPiece,
    clearSelection,
  }
}
