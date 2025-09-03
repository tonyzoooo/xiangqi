import { useState } from 'react'

import { BoardState, Piece, Side } from '@/logic'

import { useSelection } from './useBoardSelection'
import { useBoardState } from './useBoardState'
import { useHistory } from './useHistory'
import { useTimer } from './useTimer'

export const useGameLogic = () => {
  const history = useHistory()
  const { state, turn, setTurn, restartBoard, applyMove, undoMove } =
    useBoardState(history)

  const { selected, validMoves, captures, selectPiece, clearSelection } =
    useSelection(state)

  const { timer, startTimer, resetTimer, timerStarted } = useTimer()

  const [winner, setWinner] = useState<Side | null>(null)

  const handlePress = (x: number, y: number) => {
    if (!selected && !state[y][x]) return
    const clicked = state[y][x]
    if (selected) return handleMove(x, y)
    if (clicked) return selectPiece(x, y, clicked)
  }

  const handleMove = (x: number, y: number) => {
    const [sx, sy] = selected!
    const piece = state[sy][sx]!
    if (piece.side !== turn) return
    if (!timerStarted) startTimer()
    if (sx === x && sy === y) return clearSelection()
    if (!validMoves.some(([vx, vy]) => vx === x && vy === y)) return

    applyMove(sx, sy, x, y)
    clearSelection()

    const opponent: Side = turn === 'red' ? 'black' : 'red'

    if (isGeneralBlocked(state, opponent)) {
      setWinner(turn)
    } else {
      setTurn(opponent)
    }
  }

  const restartGame = () => {
    resetTimer()
    restartBoard()
    clearSelection()
    setTurn('red')
    setWinner(null)
  }

  const undoLastMove = () => {
    undoMove()
    setTurn(turn === 'red' ? 'black' : 'red')
    setWinner(null)
  }

  const handlePiecePress = (x: number, y: number, piece: Piece) => {
    if (piece.side !== turn && !selected) return
    handlePress(x, y)
  }

  const canUndoLastMove = history.length !== 0

  const isGeneralBlocked = (board: BoardState, side: Side): boolean => {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const piece = board[y][x]
        if (piece?.type === 'general' && piece.side === side) {
          const moves = piece.getValidMoves(board, x, y)
          return moves.length === 0
        }
      }
    }
    return true
  }

  return {
    state,
    selected,
    validMoves,
    captures,
    turn,
    timer,
    winner,
    restartGame,
    undoLastMove,
    handlePress,
    handlePiecePress,
    canUndoLastMove,
  }
}
