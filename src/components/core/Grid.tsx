import { View, StyleSheet, Text } from 'react-native'

import { CELL_SIZE, COLS, GRID_WIDTH, ROWS } from '@/constants'
import { colors } from '@/theme'

export const Grid = () => {
  return (
    <View style={styles.grid}>
      {Array.from({ length: ROWS }).map((_, y) => {
        if (y === 4) {
          return (
            <View key="river" style={styles.river}>
              <Text selectable={false} style={styles.riverText}>
                {'楚' +
                  '\u00A0'.repeat(5) +
                  '河' +
                  '\u00A0'.repeat(30) +
                  '漢' +
                  '\u00A0'.repeat(5) +
                  '界'}
              </Text>
            </View>
          )
        }

        return (
          <View key={y} style={styles.row}>
            {Array.from({ length: COLS }).map((_, x) => (
              <View key={x} style={styles.cell} />
            ))}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    borderColor: colors.boardBorder,
    borderWidth: GRID_WIDTH,
    height: CELL_SIZE,
    width: CELL_SIZE,
  },
  grid: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  river: {
    alignItems: 'center',
    height: CELL_SIZE,
    justifyContent: 'center',
    width: CELL_SIZE * COLS,
  },
  riverText: {
    color: colors.boardBorder,
    fontSize: CELL_SIZE * 0.4,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
})
