import { View, StyleSheet, Text } from 'react-native'

import { COLS, GRID_WIDTH, ROWS } from '@/constants'
import { colors, useTheme } from '@/theme'

export const Grid = () => {
  const { cellSize } = useTheme()

  return (
    <View style={styles.grid}>
      {Array.from({ length: ROWS }).map((_, y) => {
        if (y === 4) {
          return (
            <View
              key="river"
              style={[styles.river, { height: cellSize, width: cellSize * COLS }]}
            >
              <Text selectable={false} style={[styles.riverText, { fontSize: cellSize * 0.4 }]}>
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
              <View
                key={x}
                style={[styles.cell, { height: cellSize, width: cellSize }]}
              />
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
  },
  grid: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  river: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  riverText: {
    color: colors.boardBorder,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
})
