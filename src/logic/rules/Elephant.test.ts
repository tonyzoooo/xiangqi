import { Elephant, General } from '.'
import type { BoardState } from '../types'

const createEmptyBoard = (): BoardState =>
  Array.from({ length: 10 }, () => Array(9).fill(null))

describe('Elephant#getValidMoves', () => {
  it('can move diagonally without obstruction and without crossing river', () => {
    const board = createEmptyBoard()
    const elephant = new Elephant('red')
    board[9][4] = elephant

    const moves = elephant.getValidMoves(board, 4, 9)
    expect(moves).toEqual(
      expect.arrayContaining([
        [2, 7],
        [6, 7],
      ])
    )
  })

  it('cannot move if midpoint is blocked', () => {
    const board = createEmptyBoard()
    const elephant = new Elephant('red')
    board[9][4] = elephant
    board[8][5] = new Elephant('black') // bloque le chemin vers [6,7]

    const moves = elephant.getValidMoves(board, 4, 9)
    expect(moves).not.toContainEqual([6, 7])
  })

  it('cannot cross the river', () => {
    const board = createEmptyBoard()
    const elephant = new Elephant('red')
    board[5][4] = elephant

    const moves = elephant.getValidMoves(board, 4, 5)
    expect(moves).not.toEqual(
      expect.arrayContaining([
        [2, 3],
        [6, 3],
      ])
    )
  })

  it('can capture enemy if valid move', () => {
    const board = createEmptyBoard()
    const elephant = new Elephant('red')
    board[9][4] = elephant
    board[7][2] = new Elephant('black')
    board[8][3] = null

    const moves = elephant.getValidMoves(board, 4, 9)
    expect(moves).toContainEqual([2, 7])
  })

  it('cannot capture ally', () => {
    const board = createEmptyBoard()
    const elephant = new Elephant('red')
    board[9][4] = elephant
    board[7][2] = new Elephant('red')
    board[8][3] = null

    const moves = elephant.getValidMoves(board, 4, 9)
    expect(moves).not.toContainEqual([2, 7])
  })

  it('cannot move if it exposes flying general', () => {
    const board = createEmptyBoard()
    const elephant = new Elephant('red')
    const redGeneral = new General('red')
    const blackGeneral = new General('black')

    board[4][9] = redGeneral
    board[4][0] = blackGeneral
    board[4][2] = elephant

    const moves = elephant.getValidMoves(board, 4, 2)
    expect(moves).toEqual([])
  })
})
