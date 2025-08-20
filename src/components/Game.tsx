import { View, StyleSheet } from 'react-native'
import { Board, InteractionGrid, Piece as PieceComponent } from '@/components'
import { createInitialBoard } from '@/logic'
import { BORDER_WIDTH, CELL_SIZE, PIECE_SIZE, STROKE_WIDTH } from '@/constants'
import { useState } from 'react'

export const Game = () => {
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [state, setState] = useState(createInitialBoard())

  const handlePress = (x: number, y: number) => {
    const clicked = state[y][x]

    if (selected) {
      const [sx, sy] = selected

      if (sx === x && sy === y) {
        setSelected(null)
        return
      }

      const newBoard = state.map((row) => [...row])
      newBoard[y][x] = state[sy][sx]
      newBoard[sy][sx] = null

      setState(newBoard)
      setSelected(null)
    } else {
      if (clicked) setSelected([x, y])
    }
  }

  return (
    <View style={styles.container}>
      <Board />
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
