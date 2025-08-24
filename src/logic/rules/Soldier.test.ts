import { General } from './General'
import { Soldier } from './Soldier'
import { BoardState } from '../types'

const createEmptyBoard = (): BoardState =>
  Array.from({ length: 10 }, () => Array(9).fill(null))

describe('Soldier#getValidMoves', () => {
  it('allows red soldier to move forward before crossing the river', () => {
    const board = createEmptyBoard()
    const soldier = new Soldier('red')
    board[6][4] = soldier

    const moves = soldier.getValidMoves(board, 4, 6)
    expect(moves).toEqual([[4, 5]])
  })

  it('allows red soldier to move forward and sideways after crossing the river', () => {
    const board = createEmptyBoard()
    const soldier = new Soldier('red')
    board[4][4] = soldier

    const moves = soldier.getValidMoves(board, 4, 4)
    expect(moves).toEqual(
      expect.arrayContaining([
        [4, 3],
        [3, 4],
        [5, 4],
      ])
    )
    expect(moves.length).toBe(3)
  })

  it('allows black soldier to move forward before crossing the river', () => {
    const board = createEmptyBoard()
    const soldier = new Soldier('black')
    board[3][4] = soldier

    const moves = soldier.getValidMoves(board, 4, 3)
    expect(moves).toEqual([[4, 4]])
  })

  it('prevents soldier from moving outside board', () => {
    const board = createEmptyBoard()
    const soldier = new Soldier('red')
    board[0][0] = soldier

    const moves = soldier.getValidMoves(board, 0, 0)
    expect(moves).toEqual([[1, 0]])
  })

  it('cannot move backward at any time', () => {
    const board = createEmptyBoard()
    const red = new Soldier('red')
    const black = new Soldier('black')

    board[4][4] = red
    board[5][5] = black

    expect(red.getValidMoves(board, 4, 4)).not.toContainEqual([4, 5])
    expect(black.getValidMoves(board, 5, 5)).not.toContainEqual([5, 4])
  })

  it('cannot capture the general', () => {
    const board = createEmptyBoard()
    const redSoldier = new Soldier('red')
    const blackGeneral = new General('black')

    board[4][5] = redSoldier
    board[4][6] = blackGeneral

    const moves = redSoldier.getValidMoves(board, 5, 4)
    expect(moves).not.toContainEqual([6, 4])
  })

  it('cannot move if it exposes flying general', () => {
    const board = Array.from({ length: 10 }, () => Array(9).fill(null))
    const redGeneral = new General('red')
    const blackGeneral = new General('black')
    const soldier = new Soldier('red')

    board[0][4] = blackGeneral
    board[4][4] = soldier
    board[9][4] = redGeneral

    const moves = soldier.getValidMoves(board, 4, 4)
    expect(moves).toEqual([[4, 3]])
  })
})
