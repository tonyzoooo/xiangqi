import React from 'react'

import { Piece } from '@/logic'

import {
  ValidMovesOverlay,
  Captures,
  InteractionGrid,
  TurnAnnouncement,
} from './overlays'

export const GameOverlay = ({
  validMoves,
  captures,
  turn,
  showAnnouncement,
  onPress,
}: {
  validMoves: [number, number][]
  captures: [number, number][]
  state: (Piece | null)[][]
  turn: 'red' | 'black'
  selected: [number, number] | null
  showAnnouncement: boolean
  onPress: (x: number, y: number) => void
}) => {
  return (
    <>
      <ValidMovesOverlay moves={validMoves} />
      <InteractionGrid onPress={onPress} />
      <Captures captures={captures} />
      {showAnnouncement && (
        <TurnAnnouncement
          turn={turn}
          visible={showAnnouncement}
          onFinish={() => {}}
        />
      )}
    </>
  )
}
