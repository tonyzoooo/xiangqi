import { useState } from 'react'
import { View, StyleSheet, Vibration } from 'react-native'

import { Board, InteractionGrid, Piece as PieceComponent } from '@/components'
import { BORDER_WIDTH, CELL_SIZE, PIECE_SIZE, STROKE_WIDTH } from '@/constants'
import { createInitialBoard } from '@/logic'

import { Captures, ValidMovesOverlay } from './overlays'

export const Game = () => {
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [validMoves, setValidMoves] = useState<[number, number][]>([])
  const [captures, setCaptures] = useState<[number, number][]>([])
  const [state, setState] = useState(createInitialBoard())

  const handlePress = (x: number, y: number) => {
    const clicked = state[y][x]

    if (selected) {
      const [sx, sy] = selected

      if (sx === x && sy === y) {
        setSelected(null)
        setValidMoves([])
        setCaptures([])
        return
      }

      const isValid = validMoves.some(([vx, vy]) => vx === x && vy === y)

      if (!isValid) {
        Vibration.vibrate(100)
        return
      }

      const newBoard = state.map((row) => [...row])
      newBoard[y][x] = state[sy][sx]
      newBoard[sy][sx] = null

      setState(newBoard)
      setSelected(null)
      setValidMoves([])
      setCaptures([])
    } else {
      if (clicked) {
        setSelected([x, y])
        const moves = clicked.getValidMoves(state, x, y)
        const captures = moves.filter(([mx, my]) => {
          const target = state[my][mx]
          return target && target.side !== clicked.side
        })

        setValidMoves(moves)
        setCaptures(captures)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Board />
      <ValidMovesOverlay moves={validMoves} />
      <InteractionGrid onPress={handlePress} />
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
              <PieceComponent
                piece={piece}
                side={piece.side}
                onPress={() => handlePress(x, y)}
                selected={selected?.[0] === x && selected?.[1] === y}
              />
            </View>
          ) : null
        )
      )}
      <Captures captures={captures} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  piecePosition: {
    alignItems: 'center',
    height: PIECE_SIZE + STROKE_WIDTH,
    justifyContent: 'center',
    position: 'absolute',
    width: PIECE_SIZE + STROKE_WIDTH,
  },
})
