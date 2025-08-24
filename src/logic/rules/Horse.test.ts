import { Chariot, Horse, General } from '.'
import type { BoardState } from '../types'

const createEmptyBoard = (): BoardState =>
  Array.from({ length: 10 }, () => Array(9).fill(null))

describe('Horse#getValidMoves', () => {
  it('can move in L-shape with no obstruction', () => {
    const board = createEmptyBoard()
    const horse = new Horse('red')
    board[4][4] = horse

    const moves = horse.getValidMoves(board, 4, 4)

    expect(moves).toEqual(
      expect.arrayContaining([
        [3, 2],
        [5, 2],
        [3, 6],
        [5, 6],
        [2, 3],
        [2, 5],
        [6, 3],
        [6, 5],
      ])
    )
    expect(moves.length).toBe(8)
  })

  it('cannot move past a blocked leg', () => {
    const board = createEmptyBoard()
    const horse = new Horse('red')
    board[4][4] = horse
    board[4][5] = new Chariot('red')

    const moves = horse.getValidMoves(board, 4, 4)

    expect(moves).not.toEqual(
      expect.arrayContaining([
        [6, 3],
        [6, 5],
      ])
    )
  })

  it('can capture opponent but not ally', () => {
    const board = createEmptyBoard()
    const horse = new Horse('red')
    board[4][4] = horse
    board[2][3] = new Chariot('black')
    board[2][5] = new Chariot('red')

    const moves = horse.getValidMoves(board, 4, 4)

    expect(moves).toContainEqual([3, 2])
    expect(moves).not.toContainEqual([5, 2])
  })
  it('cannot move if it exposes flying general', () => {
    const board = createEmptyBoard()
    const horse = new Horse('red')
    const redGeneral = new General('red')
    const blackGeneral = new General('black')

    board[0][4] = blackGeneral
    board[4][4] = horse
    board[9][4] = redGeneral

    const moves = horse.getValidMoves(board, 4, 4)
    expect(moves).not.toContainEqual([3, 2])
    expect(moves).toEqual([])
  })

  it('cannot capture general and has no other moves', () => {
    const board = createEmptyBoard()
    const horse = new Horse('red')
    const blackGeneral = new General('black')

    board[4][4] = horse
    board[2][3] = blackGeneral

    const moves = horse.getValidMoves(board, 4, 4)
    expect(moves).toEqual([])
  })
})
