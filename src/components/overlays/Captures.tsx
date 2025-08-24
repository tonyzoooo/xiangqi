import { View, StyleSheet } from 'react-native'

import { CELL_SIZE } from '@/constants'
import { colors } from '@/theme'

type CapturesProps = {
  captures: [number, number][]
}

export const Captures = ({ captures }: CapturesProps) => {
  return (
    <>
      {captures.map(([x, y]) => {
        const size = CELL_SIZE * 0.25
        const offset = (CELL_SIZE - size) / 2

        return (
          <View
            key={`${x}-${y}`}
            style={[
              styles.capture,
              {
                top: y * CELL_SIZE + offset,
                left: x * CELL_SIZE + offset,
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
  capture: {
    backgroundColor: colors.capture,
    position: 'absolute',
  },
})
