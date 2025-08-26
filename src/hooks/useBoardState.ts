import { useState } from 'react'

import { createInitialBoard, MoveHistory, PieceFactory } from '@/logic'

export const useBoardState = (history: MoveHistory) => {
  const [state, setState] = useState(createInitialBoard())
  const [turn, setTurn] = useState<'red' | 'black'>('red')

  const restartBoard = () => {
    history.clear()
    setState(createInitialBoard())
  }

  const applyMove = (sx: number, sy: number, x: number, y: number) => {
    const newBoard = state.map((row) => [...row])
    const piece = state[sy][sx]!
    newBoard[y][x] = piece
    newBoard[sy][sx] = null

    history.push({
      from: [sx, sy],
      to: [x, y],
      piece: piece.type,
      captured: state[y][x]?.type,
      capturedSide: state[y][x]?.side,
    })

    setState(newBoard)
  }

  const undoMove = () => {
    const last = history.pop()
    if (!last) return
    const newBoard = state.map((row) => [...row])
    const moved = newBoard[last.to[1]][last.to[0]]
    newBoard[last.from[1]][last.from[0]] = moved
    newBoard[last.to[1]][last.to[0]] = last.captured
      ? PieceFactory.create(last.captured, last.capturedSide)
      : null
    setState(newBoard)
  }

  return {
    state,
    setState,
    turn,
    setTurn,
    restartBoard,
    applyMove,
    undoMove,
  }
}
