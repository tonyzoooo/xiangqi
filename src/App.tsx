import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'

import { Game } from '@/components'
import { GameProvider } from '@/context/GameContext'

import { colors } from './theme'

export default function App() {
  return (
    <GameProvider>
      <View style={styles.container}>
        <Game />
        <StatusBar style="auto" />
      </View>
    </GameProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
})
