import { View, StyleSheet } from 'react-native'

import { colors, useTheme } from '@/theme'

type ValidMovesOverlayProps = {
  moves: [number, number][]
}

export const ValidMovesOverlay = ({ moves }: ValidMovesOverlayProps) => {
  const { cellSize } = useTheme()

  return (
    <>
      {moves.map(([x, y]) => {
        const size = cellSize * 0.32
        const offset = (cellSize - size) / 2

        return (
          <View
            key={`${x}-${y}`}
            style={[
              styles.marker,
              {
                width: size,
                height: size,
                top: y * cellSize + offset,
                left: x * cellSize + offset,
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
