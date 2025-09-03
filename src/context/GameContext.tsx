import { createContext, useContext, ReactNode } from 'react'

import { useGameLogic } from '@/hooks/useGameLogic'

const GameContext = createContext<ReturnType<typeof useGameLogic> | null>(null)

type GameProviderProps = {
  children: ReactNode
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const logic = useGameLogic()
  return <GameContext.Provider value={logic}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
