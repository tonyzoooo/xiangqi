import { Cannon } from './Cannon'
import { Chariot } from './Chariot'
import { General } from './General'
import { createEmptyBoard } from '../board'

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

  it('can capture the general by jumping', () => {
    const board = createEmptyBoard()
    const cannon = new Cannon('red')
    const blackGeneral = new General('black')

    board[4][4] = cannon
    board[4][5] = new Chariot('red')
    board[4][6] = blackGeneral

    const moves = cannon.getValidMoves(board, 4, 4)
    expect(moves).toContainEqual([6, 4])
  })

  it('cannot move horizontally if flying general is violated', () => {
    const board = createEmptyBoard()
    const cannon = new Cannon('red')
    const redGeneral = new General('red')
    const blackGeneral = new General('black')

    board[0][4] = blackGeneral  // y=0, x=4
    board[4][4] = cannon        // y=4, x=4 (blocking in column 4)
    board[9][4] = redGeneral    // y=9, x=4

    const moves = cannon.getValidMoves(board, 4, 4)

    // All valid moves must stay in column x=4 (horizontal moves expose flying general)
    for (const [x] of moves) {
      expect(x).toBe(4)
    }
  })
})
