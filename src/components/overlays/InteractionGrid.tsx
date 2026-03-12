import { Pressable, StyleSheet, View } from 'react-native'

import { COLS, ROWS } from '@/constants'
import { useTheme } from '@/theme'

type Props = {
  onPress: (x: number, y: number) => void
}

export const InteractionGrid = ({ onPress }: Props) => {
  const { cellSize } = useTheme()

  return (
    <View style={StyleSheet.absoluteFill}>
      {Array.from({ length: ROWS + 1 }).map((_, y) =>
        Array.from({ length: COLS + 1 }).map((_, x) => (
          <Pressable
            key={`${x}-${y}`}
            onPress={() => onPress(x, y)}
            style={[
              styles.cell,
              {
                top: y * cellSize,
                left: x * cellSize,
                width: cellSize,
                height: cellSize,
              },
            ]}
          />
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
})
