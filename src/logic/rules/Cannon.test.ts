import { Cannon } from './Cannon'
import { Chariot } from './Chariot'
import { General } from './General'
import type { BoardState } from '../types'

const createEmptyBoard = (): BoardState =>
  Array.from({ length: 10 }, () => Array(9).fill(null))

describe('Cannon#getValidMoves', () => {
  it('moves freely in straight lines until first piece', () => {
    const board = createEmptyBoard()
    const cannon = new Cannon('red')
    board[4][4] = cannon

    const moves = cannon.getValidMoves(board, 4, 4)

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
  })

  it('can capture by jumping over one piece', () => {
    const board = createEmptyBoard()
    const cannon = new Cannon('red')
    const target = new Chariot('black')

    board[4][4] = cannon
    board[4][5] = new Chariot('red')
    board[4][6] = target

    const moves = cannon.getValidMoves(board, 4, 4)
    expect(moves).toContainEqual([6, 4])
  })

  it('cannot capture ally', () => {
    const board = createEmptyBoard()
    const cannon = new Cannon('red')

    board[4][4] = cannon
    board[4][5] = new Chariot('black')
    board[4][6] = new Chariot('red')

    const moves = cannon.getValidMoves(board, 4, 4)
    expect(moves).not.toContainEqual([6, 4])
  })

  it('cannot move if capturing general is possible', () => {
    const board = createEmptyBoard()
    const cannon = new Cannon('red')
    const blackGeneral = new General('black')

    board[4][4] = cannon
    board[4][5] = new Chariot('red')
    board[4][6] = blackGeneral

    const moves = cannon.getValidMoves(board, 4, 4)
    expect(moves).toEqual([])
  })

  it('ignores flying general rule if not violated', () => {
    const board = createEmptyBoard()
    const cannon = new Cannon('red')
    const redGeneral = new General('red')
    const blackGeneral = new General('black')

    board[4][4] = cannon
    board[0][0] = blackGeneral
    board[9][0] = redGeneral

    const moves = cannon.getValidMoves(board, 4, 4)
    expect(moves.length).toBeGreaterThan(0)
  })

  it('cannot move horizontally if flying general is violated', () => {
    const board = createEmptyBoard()
    const cannon = new Cannon('red')
    const redGeneral = new General('red')
    const blackGeneral = new General('black')

    board[4][4] = cannon
    board[4][0] = blackGeneral
    board[4][9] = redGeneral

    const moves = cannon.getValidMoves(board, 4, 4)

    console.log(moves)
    for (const [x] of moves) {
      expect(x).toBe(4)
    }
  })
})
