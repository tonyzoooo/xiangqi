import type { PieceType, Side } from '../types'
import { Advisor } from './Advisor'
import { Cannon } from './Cannon'
import { Chariot } from './Chariot'
import { Elephant } from './Elephant'
import { General } from './General'
import { Horse } from './Horse'
import type { Piece } from './Piece'
import { Soldier } from './Soldier'

export class PieceFactory {
  static create(type: PieceType, side: Side): Piece {
    switch (type) {
      case 'advisor':
        return new Advisor(side)
      case 'cannon':
        return new Cannon(side)
      case 'chariot':
        return new Chariot(side)
      case 'elephant':
        return new Elephant(side)
      case 'general':
        return new General(side)
      case 'horse':
        return new Horse(side)
      case 'soldier':
        return new Soldier(side)
    }
  }
}
