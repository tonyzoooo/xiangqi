import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import type { Side } from '@/logic/types'
import { colors } from '@/theme'

type UserInterfaceProps = {
  turn: Side
  timer: string
  onRestart: () => void
  onUndo: () => void
  canUndo: boolean
}

const sideLabel = {
  red: 'Red',
  black: 'Black',
}

export const UserInterface = ({
  turn,
  timer,
  onRestart,
  onUndo,
  canUndo,
}: UserInterfaceProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text
          style={[styles.turnText, turn === 'red' ? styles.red : styles.black]}
          selectable={false}
        >
          {sideLabel[turn]}
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.iconButton, !canUndo && styles.iconButtonDisabled]}
          onPress={canUndo ? onUndo : undefined}
        >
          <MaterialCommunityIcons
            name="undo-variant"
            size={26}
            color="#2c3e50"
          />
        </Pressable>

        <Text style={styles.timer}>{timer}</Text>

        <Pressable style={styles.iconButton} onPress={onRestart}>
          <MaterialCommunityIcons name="restart" size={26} color="#2c3e50" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  black: {
    color: colors.black,
  },
  bottomBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingVertical: 20,
    pointerEvents: 'box-none',
  },
  iconButton: {
    backgroundColor: colors.boardFill,
    borderRadius: 8,
    elevation: 2,
    padding: 12,
    pointerEvents: 'auto',
  },
  iconButtonDisabled: {
    opacity: 0.3,
    pointerEvents: 'none',
  },
  red: {
    color: colors.red,
  },
  timer: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  topBar: {
    alignSelf: 'center',
    backgroundColor: colors.boardFill,
    borderRadius: 12,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  turnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
