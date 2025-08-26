import { View, StyleSheet } from 'react-native'

import { BORDER_WIDTH, CELL_SIZE, COLS, ROWS } from '@/constants'
import { colors } from '@/theme'

import { Grid } from './Grid'
import { PalaceOverlay } from '../overlays'

export const Board = () => {
  return (
    <View style={styles.outerWrapper}>
      <View style={styles.board}>
        <Grid />
        <PalaceOverlay />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    backgroundColor: colors.boardFill,
    borderColor: colors.boardBorder,
    borderWidth: BORDER_WIDTH,
    height: CELL_SIZE * ROWS,
    justifyContent: 'center',
    width: CELL_SIZE * COLS,
  },
  outerWrapper: {
    alignItems: 'center',
    backgroundColor: colors.boardFill,
    justifyContent: 'center',
    padding: CELL_SIZE / 2,
  },
})
