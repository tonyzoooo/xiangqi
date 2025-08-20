import { FC } from 'react'
import { Piece as PieceInfo, Side } from '@/logic'
import { colors, DisplayType } from '@/theme'
import { ICONS, PIECE_SIZE, STROKE_WIDTH } from '@/constants'
import Svg, { Circle, Text } from 'react-native-svg'
import { SvgProps } from 'react-native-svg'
import { Pressable } from 'react-native'

type PieceProps = {
  piece: PieceInfo
  side: Side
  displayType?: DisplayType
  onPress?: () => void
  selected?: boolean
}

export const Piece = ({
  piece,
  side,
  displayType = 'svg',
  onPress,
  selected,
}: PieceProps) => {
  const color = side === 'red' ? colors.red : colors.black

  const IconCommon: FC<SvgProps> = ICONS.common[piece.type]
  const IconSide: FC<SvgProps> = ICONS[side][piece.type]

  const renderIcon = (Icon: FC<SvgProps>) => (
    <Icon
      width={PIECE_SIZE * 0.6}
      height={PIECE_SIZE * 0.6}
      x={(PIECE_SIZE - PIECE_SIZE * 0.6) / 2}
      y={(PIECE_SIZE - PIECE_SIZE * 0.6) / 2}
      color={color}
    />
  )

  const renderText = () => (
    <Text
      x="50%"
      y="55%"
      fontSize={PIECE_SIZE * 0.3}
      fill={color}
      fontWeight="bold"
      textAnchor="middle"
    >
      {getChar(piece.type, side)}
    </Text>
  )

  return (
    <Pressable onPress={onPress}>
      <Svg width={PIECE_SIZE} height={PIECE_SIZE}>
        <Circle
          cx="50%"
          cy="50%"
          r={PIECE_SIZE / 2 - STROKE_WIDTH}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          fill={selected ? '#ff0' : '#fff'}
          fillOpacity={1}
        />
        {displayType === 'text'
          ? renderText()
          : displayType === 'icon'
            ? renderIcon(IconCommon)
            : renderIcon(IconSide)}
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
