import { View, StyleSheet } from 'react-native'

import { BORDER_WIDTH, COLS, ROWS } from '@/constants'
import { colors, useTheme } from '@/theme'

import { Grid } from './Grid'
import { PalaceOverlay } from '../overlays'

export const Board = () => {
  const { cellSize } = useTheme()

  return (
    <View style={[styles.outerWrapper, { padding: cellSize / 2 }]}>
      <View
        style={[
          styles.board,
          {
            height: cellSize * ROWS,
            width: cellSize * COLS,
          },
        ]}
      >
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
    justifyContent: 'center',
  },
  outerWrapper: {
    alignItems: 'center',
    backgroundColor: colors.boardFill,
    justifyContent: 'center',
  },
})
