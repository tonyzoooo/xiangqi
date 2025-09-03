import React from 'react'

import { Piece } from '@/logic'

import { ValidMovesOverlay, Captures, InteractionGrid } from './overlays'

export const GameOverlay = ({
  validMoves,
  captures,
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
    </>
  )
}
