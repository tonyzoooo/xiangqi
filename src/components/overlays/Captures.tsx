import { View, StyleSheet } from 'react-native'

import { BORDER_WIDTH, CELL_SIZE, PIECE_SIZE, STROKE_WIDTH } from '@/constants'
import { colors } from '@/theme'

type CapturesProps = {
  captures: [number, number][]
}

export const Captures = ({ captures }: CapturesProps) => {
  return (
    <>
      {captures.map(([x, y]) => {
        const size = PIECE_SIZE + 4

        return (
          <View
            key={`${x}-${y}`}
            style={[
              styles.ring,
              {
                top: y * CELL_SIZE + BORDER_WIDTH + (PIECE_SIZE + STROKE_WIDTH - size) / 2,
                left: x * CELL_SIZE + BORDER_WIDTH + (PIECE_SIZE + STROKE_WIDTH - size) / 2,
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
