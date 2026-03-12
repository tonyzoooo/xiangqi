import { FC } from 'react'
import { Pressable } from 'react-native'
import Svg, { Circle, Text, G } from 'react-native-svg'
import { SvgProps } from 'react-native-svg'

import { ICONS, STROKE_WIDTH } from '@/constants'
import { Piece as PieceInfo, Side } from '@/logic'
import { colors, useTheme } from '@/theme'

type PieceProps = {
  piece: PieceInfo
  side: Side
  onPress?: () => void
  selected?: boolean
}

export const Piece = ({ piece, side, onPress, selected }: PieceProps) => {
  const { pieceSize, displayType } = useTheme()
  const color = side === 'red' ? colors.red : colors.black
  const iconSize = pieceSize * 0.6
  const offset = (pieceSize - iconSize) / 2

  const IconCommon: FC<SvgProps> = ICONS.common[piece.type]
  const IconSide: FC<SvgProps> = ICONS[side][piece.type]

  return (
    <Pressable onPress={onPress}>
      <Svg
        width={pieceSize}
        height={pieceSize}
        style={
          side === 'black' ? { transform: [{ rotate: '180deg' }] } : undefined
        }
      >
        <Circle
          cx={pieceSize / 2}
          cy={pieceSize / 2}
          r={pieceSize / 2 - STROKE_WIDTH}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          fill={selected ? '#ff0' : '#fff'}
        />

        {displayType === 'text' ? (
          <Text
            x={pieceSize / 2}
            y={pieceSize / 2}
            fontSize={pieceSize * 0.52}
            fill={color}
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {getChar(piece.type, side)}
          </Text>
        ) : (
          <G transform={`translate(${offset}, ${offset})`}>
            {displayType === 'icon' ? (
              <IconCommon width={iconSize} height={iconSize} color={color} />
            ) : (
              <IconSide width={iconSize} height={iconSize} color={color} />
            )}
          </G>
        )}
      </Svg>
    </Pressable>
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
