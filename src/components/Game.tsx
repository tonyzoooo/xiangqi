import React from 'react'
import { View, StyleSheet } from 'react-native'

import { useGameLogic, useOrientation } from '@/hooks'
import { formatTime } from '@/logic'

import { Board } from './core'
import { GameOverlay } from './GameOverlay'
import { GamePieces } from './GamePieces'
import { UserInterface } from './overlays'

export const Game = () => {
  const orientation = useOrientation()

  const {
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
  } = useGameLogic()

  return (
    <View style={styles.container}>
      <View style={orientation === 'landscape' ? styles.rotated : null}>
        <Board />
        <GameOverlay
          validMoves={validMoves}
          captures={captures}
          state={state}
          turn={turn}
          selected={selected}
          onPress={handlePress}
          showAnnouncement
        />
        <GamePieces
          state={state}
          turn={turn}
          selected={selected}
          onPress={handlePiecePress}
        />
      </View>
      <UserInterface
        turn={turn}
        onRestart={restartGame}
        onUndo={undoLastMove}
        timer={formatTime(timer)}
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
  rotated: {
    transform: [{ rotate: '90deg' }],
    transformOrigin: 'center',
  },
})
