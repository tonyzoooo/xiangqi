import {
  Advisor,
  Cannon,
  Chariot,
  Elephant,
  General,
  Horse,
  PieceFactory,
  Soldier,
} from '.'
import { Piece } from './Piece'
import type { PieceType } from '../types'

const types: [PieceType, new (side: 'red' | 'black') => Piece][] = [
  ['advisor', Advisor],
  ['cannon', Cannon],
  ['chariot', Chariot],
  ['elephant', Elephant],
  ['general', General],
  ['horse', Horse],
  ['soldier', Soldier],
]

describe('PieceFactory.create', () => {
  it.each(types)('creates %s piece', (type, Klass) => {
    const piece = PieceFactory.create(type, 'red')
    expect(piece).toBeInstanceOf(Klass)
    expect(piece.side).toBe('red')
    expect(piece.type).toBe(type)
  })
})
