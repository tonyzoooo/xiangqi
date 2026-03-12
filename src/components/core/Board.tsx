import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { BORDER_WIDTH, COLS, ROWS } from '@/constants'
import { colors, useTheme } from '@/theme'

import { Grid } from './Grid'
import { PalaceOverlay } from '../overlays'

export const Board = () => {
  const { cellSize, showCoordinates } = useTheme()
  const pad = cellSize / 2
  const labelSize = cellSize * 0.38

  return (
    // padding: cellSize/2 is required — it offsets the board so that
    // absolute-positioned piece overlays (siblings in Game.tsx) align
    // with the grid intersections. Labels float in this padding area.
    <View style={[styles.outerWrapper, { padding: pad }]}>
      <View
        style={[
          styles.board,
          { height: cellSize * ROWS, width: cellSize * COLS },
        ]}
      >
        <Grid />
        <PalaceOverlay />
      </View>

      {showCoordinates && (
        <>
          {/* File labels: top (Black) and bottom (Red) */}
          {Array.from({ length: COLS + 1 }, (_, i) => (
            <React.Fragment key={i}>
              <Text
                selectable={false}
                style={[
                  styles.fileLabel,
                  styles.blackLabel,
                  { top: 0, left: i * cellSize, width: cellSize, height: pad, fontSize: labelSize },
                ]}
              >
                {String(COLS + 1 - i)}
              </Text>
              <Text
                selectable={false}
                style={[
                  styles.fileLabel,
                  styles.redLabel,
                  { bottom: 0, left: i * cellSize, width: cellSize, height: pad, fontSize: labelSize },
                ]}
              >
                {String(i + 1)}
              </Text>
            </React.Fragment>
          ))}

          {/* Rank labels: left column */}
          {Array.from({ length: ROWS + 1 }, (_, i) => (
            <Text
              key={i}
              selectable={false}
              style={[
                styles.rankLabel,
                { top: i * cellSize, left: 0, width: pad, height: cellSize, fontSize: labelSize },
              ]}
            >
              {String(i + 1)}
            </Text>
          ))}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  blackLabel: {
    color: colors.black,
  },
  board: {
    alignItems: 'center',
    backgroundColor: colors.boardFill,
    borderColor: colors.boardBorder,
    borderWidth: BORDER_WIDTH,
    justifyContent: 'center',
  },
  fileLabel: {
    fontWeight: '600',
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  outerWrapper: {
    alignItems: 'center',
    backgroundColor: colors.boardFill,
    justifyContent: 'center',
  },
  rankLabel: {
    color: colors.boardBorder,
    fontWeight: '600',
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  redLabel: {
    color: colors.red,
  },
})
