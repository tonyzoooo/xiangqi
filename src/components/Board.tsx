import { View, StyleSheet } from 'react-native'
import { colors } from '../theme/colors'

const ROWS = 9
const COLS = 8
const CELL_SIZE = 36

export const Board = () => {
  return (
    <View style={styles.board}>
      {Array.from({ length: ROWS }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: COLS }).map((_, col) => (
            <View key={col} style={styles.cell} />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: colors.boardFill,
    borderColor: colors.boardBorder,
    borderWidth: 2,
    padding: 2,
  },
  cell: {
    borderColor: colors.boardBorder,
    borderWidth: 0.5,
    height: CELL_SIZE,
    width: CELL_SIZE,
  },
  row: {
    flexDirection: 'row',
  },
})
