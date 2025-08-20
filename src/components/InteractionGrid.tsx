import { Pressable, StyleSheet, View } from 'react-native'
import { CELL_SIZE, COLS, ROWS } from '@/constants'

const DEBUG = true

type Props = {
  onPress: (x: number, y: number) => void
}

export const InteractionGrid = ({ onPress }: Props) => {
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
                top: y * CELL_SIZE,
                left: x * CELL_SIZE,
              },
            ]}
          >
            {DEBUG && <View style={styles.innerCell} />}
          </Pressable>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    height: CELL_SIZE,
    justifyContent: 'center',
    position: 'absolute',
    width: CELL_SIZE,
  },
  innerCell: {
    //backgroundColor: 'rgba(255, 255, 0, 0.5)',
    borderRadius: CELL_SIZE * 0.15,
    height: CELL_SIZE * 0.3,
    width: CELL_SIZE * 0.3,
  },
})
