import { createContext, useContext, useState, ReactNode } from 'react'

import type { DisplayType } from './types'

const CELL_SIZE_DEFAULT = 36
const CELL_SIZE_MIN = 24
const CELL_SIZE_MAX = 52
const CELL_SIZE_STEP = 4

type ThemeContextType = {
  cellSize: number
  pieceSize: number
  displayType: DisplayType
  canDecreaseSize: boolean
  canIncreaseSize: boolean
  decreaseSize: () => void
  increaseSize: () => void
  setDisplayType: (type: DisplayType) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [cellSize, setCellSize] = useState(CELL_SIZE_DEFAULT)
  const [displayType, setDisplayType] = useState<DisplayType>('svg')

  return (
    <ThemeContext.Provider
      value={{
        cellSize,
        pieceSize: cellSize * 0.8,
        displayType,
        canDecreaseSize: cellSize > CELL_SIZE_MIN,
        canIncreaseSize: cellSize < CELL_SIZE_MAX,
        decreaseSize: () =>
          setCellSize((s) => Math.max(s - CELL_SIZE_STEP, CELL_SIZE_MIN)),
        increaseSize: () =>
          setCellSize((s) => Math.min(s + CELL_SIZE_STEP, CELL_SIZE_MAX)),
        setDisplayType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
