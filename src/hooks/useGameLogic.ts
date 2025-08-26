import { Piece } from '@/logic'

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
    setTurn(turn === 'red' ? 'black' : 'red')
  }

  const restartGame = () => {
    resetTimer()
    restartBoard()
    clearSelection()
    setTurn('red')
  }

  const undoLastMove = () => {
    undoMove()
    setTurn(turn === 'red' ? 'black' : 'red')
  }

  const handlePiecePress = (x: number, y: number, piece: Piece) => {
    if (piece.side !== turn && !selected) return
    handlePress(x, y)
  }

  return {
    state,
    selected,
    validMoves,
    captures,
    turn,
    timer,
    restartGame,
    undoLastMove,
    handlePress,
    handlePiecePress,
  }
}
