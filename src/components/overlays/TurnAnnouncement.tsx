import { FC, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

import { Side } from '@/logic'
import { colors } from '@/theme'

type Props = {
  turn: Side
  visible: boolean
  onFinish?: () => void
}

export const TurnAnnouncement: FC<Props> = ({ turn, visible, onFinish }) => {
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 }, () => {
        setTimeout(() => {
          opacity.value = withTiming(0, { duration: 500 }, () => {
            if (onFinish) runOnJS(onFinish)()
          })
        }, 1000)
      })
    }
  }, [visible])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text
        style={[
          styles.text,
          { color: turn === 'red' ? colors.red : colors.black },
        ]}
      >
        {turn === 'red' ? 'Red’s turn' : 'Black’s turn'}
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: colors.boardFill,
    borderRadius: 8,
    elevation: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    top: '5%',
    zIndex: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
