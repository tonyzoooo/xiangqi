import { View, StyleSheet } from 'react-native'
import { Board, Piece as PieceComponent } from '@/components'
import { createInitialBoard } from '@/logic'
import { CELL_SIZE, COLS, ROWS } from '@/constants'

const PIECE_SIZE = CELL_SIZE * 0.8
const OFFSET = (CELL_SIZE - PIECE_SIZE) / 2

const board = createInitialBoard()

export const Game = () => {
  return (
    <View style={styles.boardWrapper}>
      <Board />
      {board.map((row, y) =>
        row.map((piece, x) =>
          piece ? (
            <View
              key={`${x}-${y}`}
              style={[
                styles.piecePosition,
                {
                  top: y * CELL_SIZE - PIECE_SIZE / 2 + OFFSET,
                  left: x * CELL_SIZE - PIECE_SIZE / 2 + OFFSET,
                },
              ]}
            >
              <PieceComponent piece={piece} side={piece.side} />
            </View>
          ) : null
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  boardWrapper: {
    height: CELL_SIZE * ROWS,
    width: CELL_SIZE * COLS,
  },
  piecePosition: {
    alignItems: 'center',
    height: PIECE_SIZE,
    justifyContent: 'center',
    position: 'absolute',
    width: PIECE_SIZE,
  },
})
