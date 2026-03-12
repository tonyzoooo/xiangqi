import React from 'react'

import { Piece } from '@/logic'

import { ValidMovesOverlay, Captures, CheckIndicator, InteractionGrid } from './overlays'

export const GameOverlay = ({
  validMoves,
  captures,
  checkPosition,
  onPress,
}: {
  validMoves: [number, number][]
  captures: [number, number][]
  checkPosition: [number, number] | null
  state: (Piece | null)[][]
  turn: 'red' | 'black'
  selected: [number, number] | null
  showAnnouncement: boolean
  onPress: (x: number, y: number) => void
}) => {
  return (
    <>
      <ValidMovesOverlay moves={validMoves} />
      <CheckIndicator position={checkPosition} />
      <InteractionGrid onPress={onPress} />
      <Captures captures={captures} />
    </>
  )
}
