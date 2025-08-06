import { FC } from 'react'
import { Piece as PieceInfo, Side } from '@/logic'
import { colors, DisplayType } from '@/theme'
import { CELL_SIZE, ICONS } from '@/constants'
import Svg, { Circle, Text } from 'react-native-svg'
import { SvgProps } from 'react-native-svg'

type PieceProps = {
  piece: PieceInfo
  side: Side
  displayType?: DisplayType
}

export const Piece = ({ piece, side, displayType = 'svg' }: PieceProps) => {
  const color = side === 'red' ? colors.red : colors.black

  if (displayType === 'icon') {
    const Icon: FC<SvgProps> = ICONS.common[piece.type]
    return (
      <Svg width={CELL_SIZE * 0.8} height={CELL_SIZE * 0.8}>
        <Circle
          cx="50%"
          cy="50%"
          r="48%"
          stroke={color}
          strokeWidth={2}
          fill="#fff"
        />
        <Icon
          width={CELL_SIZE * 0.5}
          height={CELL_SIZE * 0.5}
          x={(CELL_SIZE * 0.3) / 2}
          y={(CELL_SIZE * 0.3) / 2}
          color={color}
        />
      </Svg>
    )
  }

  if (displayType === 'text') {
    return (
      <Svg width={CELL_SIZE * 0.8} height={CELL_SIZE * 0.8}>
        <Circle
          cx="50%"
          cy="50%"
          r="48%"
          stroke={color}
          strokeWidth={2}
          fill="#fff"
        />
        <Text
          x="50%"
          y="55%"
          fontSize={CELL_SIZE * 0.3}
          fill={color}
          fontWeight="bold"
          textAnchor="middle"
        >
          {getChar(piece.type, side)}
        </Text>
      </Svg>
    )
  }

  const Icon: FC<SvgProps> = ICONS[side][piece.type]
  return (
    <Svg width={CELL_SIZE * 0.8} height={CELL_SIZE * 0.8}>
      <Circle
        cx="50%"
        cy="50%"
        r="48%"
        stroke={color}
        strokeWidth={2}
        fill="#fff"
      />
      <Icon
        width={CELL_SIZE * 0.5}
        height={CELL_SIZE * 0.5}
        x={(CELL_SIZE * 0.3) / 2}
        y={(CELL_SIZE * 0.3) / 2}
        color={color}
      />
    </Svg>
  )
}

const getChar = (type: PieceInfo['type'], side: Side): string => {
  const chars: Record<Side, Record<PieceInfo['type'], string>> = {
    red: {
      advisor: '仕',
      cannon: '炮',
      chariot: '車',
      elephant: '相',
      general: '帥',
      horse: '馬',
      soldier: '兵',
    },
    black: {
      advisor: '士',
      cannon: '砲',
      chariot: '車',
      elephant: '象',
      general: '將',
      horse: '馬',
      soldier: '卒',
    },
  }
  return chars[side][type]
}
