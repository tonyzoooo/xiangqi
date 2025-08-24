import { StyleSheet, ViewStyle } from 'react-native'
import Svg, { Line } from 'react-native-svg'

import { BORDER_WIDTH, CELL_SIZE } from '@/constants'
import { colors } from '@/theme'

export const PalaceOverlay = () => {
  return (
    <>
      <Diagonal from={[3, 0]} to={[5, 2]} />
      <Diagonal from={[5, 0]} to={[3, 2]} />
      <Diagonal from={[3, 7]} to={[5, 9]} />
      <Diagonal from={[5, 7]} to={[3, 9]} />
    </>
  )
}

type DiagonalProps = {
  from: [number, number]
  to: [number, number]
}

const Diagonal = ({ from, to }: DiagonalProps) => {
  const [x1, y1] = from
  const [x2, y2] = to

  const width = Math.abs(x2 - x1) * CELL_SIZE
  const height = Math.abs(y2 - y1) * CELL_SIZE

  const top = Math.min(y1, y2) * CELL_SIZE - BORDER_WIDTH
  const left = Math.min(x1, x2) * CELL_SIZE - BORDER_WIDTH

  const dynamicStyle: ViewStyle = {
    top,
    left,
    width,
    height,
  }

  return (
    <Svg style={[styles.svg, dynamicStyle]}>
      <Line
        x1={x1 < x2 ? 0 : width}
        y1={y1 < y2 ? 0 : height}
        x2={x1 < x2 ? width : 0}
        y2={y1 < y2 ? height : 0}
        stroke={colors.boardBorder}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
  },
})
