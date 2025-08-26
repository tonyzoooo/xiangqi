import { Advisor } from './Advisor'
import { General } from './General'
import type { BoardState } from '../types'

const createEmptyBoard = (): BoardState =>
  Array.from({ length: 10 }, () => Array(9).fill(null))

describe('Advisor#getValidMoves', () => {
  it('moves diagonally within palace', () => {
    const board = createEmptyBoard()
    const advisor = new Advisor('red')
    board[9][4] = advisor

    const moves = advisor.getValidMoves(board, 4, 9)
    expect(moves).toEqual(
      expect.arrayContaining([
        [3, 8],
        [5, 8],
      ])
    )
  })

  it('does not move outside palace', () => {
    const board = createEmptyBoard()
    const advisor = new Advisor('red')
    board[8][3] = advisor
    const moves = advisor.getValidMoves(board, 3, 8)
    expect(moves).toEqual(expect.arrayContaining([[4, 9]]))
    expect(moves).toEqual(
      expect.arrayContaining([
        [4, 9],
        [4, 7],
      ])
    )
  })

  it('does not move to same-side piece', () => {
    const board = createEmptyBoard()
    const advisor = new Advisor('red')
    board[9][4] = advisor
    board[8][3] = new Advisor('red')

    const moves = advisor.getValidMoves(board, 4, 9)
    expect(moves).not.toContainEqual([3, 8])
    expect(moves).toContainEqual([5, 8])
  })

  it('avoids flying general violation', () => {
    const board = createEmptyBoard()
    const advisor = new Advisor('red')
    const redGeneral = new General('red')
    const blackGeneral = new General('black')

    board[9][4] = redGeneral
    board[0][4] = blackGeneral
    board[8][4] = advisor

    const moves = advisor.getValidMoves(board, 8, 4)
    expect(moves).toEqual([])
  })
})
