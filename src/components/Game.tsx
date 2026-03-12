import { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import { useGame } from '@/context'
import { useOrientation } from '@/hooks'
import { BoardState, reconstructBoardAt } from '@/logic'
import { formatTime } from '@/logic'

import { Board } from './core'
import { GameOverlay } from './GameOverlay'
import { GamePieces } from './GamePieces'
import { MoveHistoryPanel } from './MoveHistoryPanel'
import { UserInterface, VictoryBanner } from './overlays'

export const Game = () => {
  const orientation = useOrientation()
  const {
    state,
    moves,
    selected,
    validMoves,
    captures,
    turn,
    timer,
    checkPosition,
    restartGame,
    undoLastMove,
    handlePress,
    handlePiecePress,
    canUndoLastMove,
  } = useGame()

  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [previewBoard, setPreviewBoard] = useState<BoardState | null>(null)

  const handlePreview = useCallback(
    (index: number) => {
      setPreviewIndex(index)
      setPreviewBoard(reconstructBoardAt(moves, index))
    },
    [moves]
  )

  const handleClearPreview = useCallback(() => {
    setPreviewIndex(null)
    setPreviewBoard(null)
  }, [])

  const isPreviewing = previewBoard !== null

  return (
    <View style={styles.container}>
      <View style={styles.gameRow}>
        <View style={orientation === 'landscape' ? styles.rotated : null}>
          <Board />
          <GameOverlay
            validMoves={isPreviewing ? [] : validMoves}
            captures={isPreviewing ? [] : captures}
            checkPosition={isPreviewing ? null : checkPosition}
            state={state}
            turn={turn}
            selected={selected}
            onPress={isPreviewing ? handleClearPreview : handlePress}
            showAnnouncement
          />
          <GamePieces
            state={previewBoard ?? state}
            turn={turn}
            selected={isPreviewing ? null : selected}
            onPress={handlePiecePress}
          />
          <VictoryBanner />
        </View>

        <MoveHistoryPanel
          moves={moves}
          previewIndex={previewIndex}
          onPreview={handlePreview}
          onClearPreview={handleClearPreview}
        />
      </View>

      <UserInterface
        turn={turn}
        onRestart={restartGame}
        onUndo={undoLastMove}
        timer={formatTime(timer)}
        canUndo={canUndoLastMove}
        isInCheck={!isPreviewing && !!checkPosition}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  gameRow: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  rotated: {
    transform: [{ rotate: '90deg' }],
    transformOrigin: 'center',
  },
})
