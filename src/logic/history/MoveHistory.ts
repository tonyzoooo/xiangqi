import { Move } from '..'

export class MoveHistory {
  private history: Move[] = []

  push(move: Move) {
    this.history.push(move)
  }

  pop(): Move | undefined {
    return this.history.pop()
  }

  peek(): Move | undefined {
    return this.history[this.history.length - 1]
  }

  all(): Move[] {
    return [...this.history]
  }

  clear() {
    this.history = []
  }

  get length(): number {
    return this.history.length
  }
}
