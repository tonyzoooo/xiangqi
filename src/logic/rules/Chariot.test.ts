import { Chariot, General } from '.'
import type { BoardState } from '../types'

const createEmptyBoard = (): BoardState =>
  Array.from({ length: 10 }, () => Array(9).fill(null))

describe('Chariot#getValidMoves', () => {
  it('returns all linear moves until edge of board with no obstruction', () => {
    const board = createEmptyBoard()
    const chariot = new Chariot('red')
    board[4][4] = chariot

    const moves = chariot.getValidMoves(board, 4, 4)

    expect(moves).toEqual(
      expect.arrayContaining([
        [4, 3],
        [4, 2],
        [4, 1],
        [4, 0],
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
        [4, 9],

        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4],
        [5, 4],
        [6, 4],
        [7, 4],
        [8, 4],
      ])
    )
    expect(moves.length).toBe(17)
  })

  it('stops at first piece in direction', () => {
    const board = createEmptyBoard()
    const chariot = new Chariot('red')
    board[4][4] = chariot
    board[4][6] = new Chariot('red')
    board[2][4] = new Chariot('black')

    const moves = chariot.getValidMoves(board, 4, 4)

    expect(moves).toEqual(
      expect.arrayContaining([
        [4, 3],
        [4, 2],
        [3, 4],
        [5, 4],
      ])
    )

    expect(moves).not.toEqual(
      expect.arrayContaining([
        [4, 1],
        [6, 4],
      ])
    )
  })

  it('does not capture same side piece', () => {
    const board = createEmptyBoard()
    const redChariot = new Chariot('red')
    board[4][4] = redChariot
    board[4][6] = new Chariot('red') // ally

    const moves = redChariot.getValidMoves(board, 4, 4)
    expect(moves).not.toContainEqual([6, 4])
  })

  it('can capture the general', () => {
    const board = createEmptyBoard()
    const redChariot = new Chariot('red')
    const blackGeneral = new General('black')

    board[4][4] = redChariot
    board[4][6] = blackGeneral

    const moves = redChariot.getValidMoves(board, 4, 4)
    expect(moves).toContainEqual([6, 4])
  })

  it('cannot move horizontally when it would expose flying general', () => {
    const board = createEmptyBoard()
    const redChariot = new Chariot('red')
    const redGeneral = new General('red')
    const blackGeneral = new General('black')

    board[0][4] = blackGeneral  // y=0, x=4
    board[4][4] = redChariot    // y=4, x=4 (blocking in column 4)
    board[9][4] = redGeneral    // y=9, x=4

    const moves = redChariot.getValidMoves(board, 4, 4)

    // Horizontal moves would expose flying general — not allowed
    expect(moves).not.toContainEqual([0, 4])
    expect(moves).not.toContainEqual([3, 4])
    expect(moves).not.toContainEqual([5, 4])
    expect(moves).not.toContainEqual([8, 4])

    // In-column moves keep the chariot between the generals — allowed
    expect(moves).toContainEqual([4, 1])
    expect(moves).toContainEqual([4, 5])
  })
})
