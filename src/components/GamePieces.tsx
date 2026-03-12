import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BORDER_WIDTH, STROKE_WIDTH } from '@/constants'
import { Piece as PieceType, Side } from '@/logic'
import { useTheme } from '@/theme'

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
  const { cellSize, pieceSize } = useTheme()
  const containerSize = pieceSize + STROKE_WIDTH

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
                  top: y * cellSize + BORDER_WIDTH,
                  left: x * cellSize + BORDER_WIDTH,
                  width: containerSize,
                  height: containerSize,
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
    justifyContent: 'center',
    position: 'absolute',
  },
})
