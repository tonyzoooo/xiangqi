import { useState } from 'react'

import { BoardState, createInitialBoard, Move, MoveHistory, PieceFactory } from '@/logic'

export const useBoardState = (history: MoveHistory) => {
  const [state, setState] = useState(createInitialBoard())
  const [turn, setTurn] = useState<'red' | 'black'>('red')
  const [moves, setMoves] = useState<Move[]>([])

  const restartBoard = () => {
    history.clear()
    setState(createInitialBoard())
    setMoves([])
  }

  const applyMove = (sx: number, sy: number, x: number, y: number): BoardState => {
    const newBoard = state.map((row) => [...row])
    const piece = state[sy][sx]!
    newBoard[y][x] = piece
    newBoard[sy][sx] = null

    const move: Move = {
      from: [sx, sy],
      to: [x, y],
      piece: piece.type,
      captured: state[y][x]?.type,
      capturedSide: state[y][x]?.side,
    }

    history.push(move)
    setMoves((prev) => [...prev, move])
    setState(newBoard)
    return newBoard
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
    setMoves((prev) => prev.slice(0, -1))
  }

  return {
    state,
    setState,
    turn,
    setTurn,
    moves,
    restartBoard,
    applyMove,
    undoMove,
  }
}
