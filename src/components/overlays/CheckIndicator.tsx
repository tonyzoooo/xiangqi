import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'

import { BORDER_WIDTH, STROKE_WIDTH } from '@/constants'
import { colors, useTheme } from '@/theme'

type CheckIndicatorProps = {
  position: [number, number] | null
}

export const CheckIndicator = ({ position }: CheckIndicatorProps) => {
  const { cellSize, pieceSize } = useTheme()
  const pulse = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!position) {
      pulse.setValue(0)
      return
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    )
    animation.start()
    return () => animation.stop()
  }, [position])

  if (!position) return null

  const [x, y] = position
  const size = pieceSize + 8
  const offset = (pieceSize + STROKE_WIDTH - size) / 2

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1.0],
  })

  return (
    <Animated.View
      style={[
        styles.ring,
        {
          top: y * cellSize + BORDER_WIDTH + offset,
          left: x * cellSize + BORDER_WIDTH + offset,
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  ring: {
    borderColor: colors.check,
    borderWidth: 3,
    position: 'absolute',
  },
})
