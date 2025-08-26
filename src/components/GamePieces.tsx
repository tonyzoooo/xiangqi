import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BORDER_WIDTH, CELL_SIZE, PIECE_SIZE, STROKE_WIDTH } from '@/constants'
import { Piece as PieceType, Side } from '@/logic'

import { Piece } from './core'

export const GamePieces = ({
  state,
  selected,
  onPress,
}: {
  state: (PieceType | null)[][]
  turn: Side
  selected: [number, number] | null
  onPress: (x: number, y: number, piece: PieceType) => void
}) => {
  return (
    <>
      {state.map((row, y) =>
        row.map((piece, x) =>
          piece ? (
            <View
              key={`${x}-${y}`}
              style={[
                styles.piecePosition,
                {
                  top: y * CELL_SIZE + BORDER_WIDTH,
                  left: x * CELL_SIZE + BORDER_WIDTH,
                },
              ]}
            >
              <Piece
                piece={piece}
                side={piece.side}
                onPress={() => onPress(x, y, piece)}
                selected={selected?.[0] === x && selected?.[1] === y}
              />
            </View>
          ) : null
        )
      )}
    </>
  )
}

const styles = StyleSheet.create({
  piecePosition: {
    alignItems: 'center',
    height: PIECE_SIZE + STROKE_WIDTH,
    justifyContent: 'center',
    position: 'absolute',
    width: PIECE_SIZE + STROKE_WIDTH,
  },
})
