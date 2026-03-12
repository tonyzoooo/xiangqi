import { View, StyleSheet } from 'react-native'

import { BORDER_WIDTH, STROKE_WIDTH } from '@/constants'
import { colors, useTheme } from '@/theme'

type CapturesProps = {
  captures: [number, number][]
}

export const Captures = ({ captures }: CapturesProps) => {
  const { cellSize, pieceSize } = useTheme()

  return (
    <>
      {captures.map(([x, y]) => {
        const size = pieceSize + 4
        const offset = (pieceSize + STROKE_WIDTH - size) / 2

        return (
          <View
            key={`${x}-${y}`}
            style={[
              styles.ring,
              {
                top: y * cellSize + BORDER_WIDTH + offset,
                left: x * cellSize + BORDER_WIDTH + offset,
                width: size,
                height: size,
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
  ring: {
    borderColor: colors.capture,
    borderWidth: 3,
    position: 'absolute',
  },
})
