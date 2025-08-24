import { View, StyleSheet } from 'react-native'

import { CELL_SIZE } from '@/constants'
import { colors } from '@/theme'

type ValidMovesOverlayProps = {
  moves: [number, number][]
}

export const ValidMovesOverlay = ({ moves }: ValidMovesOverlayProps) => {
  return (
    <>
      {moves.map(([x, y]) => {
        const size = CELL_SIZE * 0.2
        const offset = (CELL_SIZE - size) / 2

        return (
          <View
            key={`${x}-${y}`}
            style={[
              styles.marker,
              {
                width: size,
                height: size,
                top: y * CELL_SIZE + offset,
                left: x * CELL_SIZE + offset,
                borderRadius: size / 2,
              },
            ]}
          />
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  marker: {
    backgroundColor: colors.validMoves,
    position: 'absolute',
  },
})
