import { useRef } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { formatMove } from '@/logic/format'
import { Move } from '@/logic/types'
import { colors } from '@/theme'

type Props = {
  moves: Move[]
  previewIndex: number | null
  onPreview: (index: number) => void
  onClearPreview: () => void
}

export const MoveHistoryPanel = ({
  moves,
  previewIndex,
  onPreview,
  onClearPreview,
}: Props) => {
  const scrollRef = useRef<ScrollView>(null)

  // Group into pairs: [redMove, blackMove?]
  const pairs: [Move, Move | null][] = []
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push([moves[i], moves[i + 1] ?? null])
  }

  if (moves.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header} selectable={false}>Moves</Text>
        <Text style={styles.empty} selectable={false}>—</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header} selectable={false}>Moves</Text>

      <View style={styles.colHeaders}>
        <Text style={[styles.colNum, styles.colHeaderText]} selectable={false}>#</Text>
        <Text style={[styles.colRed, styles.colHeaderText]} selectable={false}>Red</Text>
        <Text style={[styles.colBlack, styles.colHeaderText]} selectable={false}>Black</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {pairs.map(([redMove, blackMove], pairIdx) => {
          const redIdx = pairIdx * 2
          const blackIdx = pairIdx * 2 + 1

          return (
            <View key={pairIdx} style={styles.pairRow}>
              <Text style={styles.colNum} selectable={false}>{pairIdx + 1}</Text>

              <MoveCell
                label={formatMove(redMove, 'red')}
                index={redIdx}
                side="red"
                isPreview={previewIndex === redIdx}
                onPreview={onPreview}
                onClearPreview={onClearPreview}
              />

              <MoveCell
                label={blackMove ? formatMove(blackMove, 'black') : ''}
                index={blackIdx}
                side="black"
                isPreview={previewIndex === blackIdx}
                onPreview={blackMove ? onPreview : undefined}
                onClearPreview={onClearPreview}
              />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

type MoveCellProps = {
  label: string
  index: number
  side: 'red' | 'black'
  isPreview: boolean
  onPreview?: (index: number) => void
  onClearPreview: () => void
}

const MoveCell = ({
  label,
  index,
  side,
  isPreview,
  onPreview,
  onClearPreview,
}: MoveCellProps) => {
  if (!label) return <View style={styles.colRed} />

  return (
    <Pressable
      style={[
        side === 'red' ? styles.colRed : styles.colBlack,
        styles.moveCell,
        isPreview && styles.moveCellActive,
      ]}
      onPress={() => (isPreview ? onClearPreview() : onPreview?.(index))}
      // Web hover
      // @ts-ignore — onMouseEnter/Leave are valid on React Native Web
      onMouseEnter={() => onPreview?.(index)}
      onMouseLeave={() => onClearPreview()}
    >
      <Text
        style={[
          styles.moveText,
          side === 'red' ? styles.moveRed : styles.moveBlack,
          isPreview && styles.moveTextActive,
        ]}
        selectable={false}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  colBlack: {
    flex: 1,
  },
  colHeaderText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  colHeaders: {
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 4,
    paddingHorizontal: 4,
  },
  colNum: {
    color: colors.faint,
    fontSize: 11,
    textAlign: 'right',
    width: 18,
    marginRight: 4,
  },
  colRed: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.boardFill,
    borderLeftColor: colors.divider,
    borderLeftWidth: 1,
    marginLeft: 32,
    paddingHorizontal: 8,
    paddingTop: 8,
    width: 130,
  },
  empty: {
    color: colors.faint,
    marginTop: 12,
    textAlign: 'center',
  },
  header: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  moveBlack: {
    color: colors.black,
  },
  moveCell: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  moveCellActive: {
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  moveRed: {
    color: colors.red,
  },
  moveText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '600',
  },
  moveTextActive: {
    fontWeight: '800',
  },
  pairRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  scroll: {
    flex: 1,
  },
})
