import { View, Text, StyleSheet, Pressable } from 'react-native'

import { useGame } from '@/context'

export const VictoryBanner = () => {
  const { winner, restartGame } = useGame()

  if (!winner) return null

  return (
    <View style={styles.overlay}>
      <View style={styles.banner}>
        <Text style={styles.text}>
          {winner === 'red' ? 'Red wins!' : 'Black wins!'}
        </Text>
        <Pressable style={styles.button} onPress={restartGame}>
          <Text style={styles.buttonText}>Restart</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 8,
    padding: 24,
  },
  button: {
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    zIndex: 99,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})
