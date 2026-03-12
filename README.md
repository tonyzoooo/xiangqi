# Xiangqi (Chinese Chess)

A web/mobile implementation of Xiangqi (Chinese Chess) built with **React Native** and **Expo**.

> This project is licensed for **non-commercial use only**. See [LICENSE](./LICENSE) for details.

## Features

- Full interactive Xiangqi board (9×10 intersections)
- Turn-based logic (Red vs Black) with full rule enforcement
- Flying generals rule (将军): no move may expose your own general to check
- Valid move highlights, capture overlays, and check indicator
- Move history side panel with hover/tap board preview
- Undo & restart controls
- Global timer (starts on first move)
- Toggleable grid coordinate labels
- Piece style switcher: 文字 (text), Icon, SVG
- Adjustable board size
- Landscape orientation support

## Stack

- **React Native** + **Expo**
- **TypeScript**
- **Custom game engine** — no external chess/game libraries
- **react-native-svg** for SVG piece rendering
- **@expo/vector-icons** for icon pieces

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Setup

```bash
pnpm install
pnpm start
```

### Tests

```bash
pnpm test
```

## Architecture

### Game engine

The engine uses a **pseudo-moves / legal-moves split** to enforce check rules without infinite recursion:

- `getPseudoMoves(board, x, y)` — raw movement for a piece, no check filtering
- `getValidMoves(board, x, y)` — base-class method: filters pseudo-moves by simulating each move and calling `isGeneralThreatened` on the resulting board
- `isGeneralThreatened(board, side)` — scans all enemy `getPseudoMoves` plus the flying-generals column check

This single filter handles all forms of check: direct attacks, discovered checks, and the flying generals rule.

### Piece class diagram

```mermaid
classDiagram
    class Piece {
        <<abstract>>
        +PieceType type
        +Side side
        +getPseudoMoves(board, x, y) [x,y][]
        +getValidMoves(board, x, y) [x,y][]
        +isGeneralThreatened(board, side) bool
        #simulateMove(board, from, to) BoardState
        #isInsideBoard(x, y) bool
        #isInPalace(x, y) bool
        #hasCrossedRiver(y) bool
        #sameSide(target) bool
    }

    class General {
        Moves 1 step orthogonally
        Confined to palace (3×3)
    }

    class Advisor {
        Moves 1 step diagonally
        Confined to palace (3×3)
    }

    class Elephant {
        Moves 2 steps diagonally
        Cannot cross the river
        Blocked by intervening piece
    }

    class Horse {
        Moves 1 orthogonal + 1 diagonal
        Blocked by adjacent piece (hobbling)
    }

    class Chariot {
        Slides any distance orthogonally
        Blocked by any piece
    }

    class Cannon {
        Slides freely to move
        Requires exactly 1 screen to capture
    }

    class Soldier {
        Moves 1 step forward
        Gains lateral movement after crossing river
    }

    Piece <|-- General
    Piece <|-- Advisor
    Piece <|-- Elephant
    Piece <|-- Horse
    Piece <|-- Chariot
    Piece <|-- Cannon
    Piece <|-- Soldier
```

### Project structure

```
src/
├── components/
│   ├── core/          # Board, Grid, Piece renderer
│   ├── overlays/      # ValidMoves, Captures, CheckIndicator, UI chrome
│   ├── Game.tsx       # Root game layout
│   ├── GameOverlay.tsx
│   ├── GamePieces.tsx
│   └── MoveHistoryPanel.tsx
├── context/           # GameContext (wires hooks to UI)
├── hooks/
│   ├── useBoardState.ts   # Board state + move history
│   ├── useGameLogic.ts    # Turn, check detection, win condition
│   └── useOrientation.ts
├── logic/
│   ├── rules/         # Piece subclasses + PieceFactory
│   ├── board.ts       # Board init + move reconstruction
│   ├── format.ts      # Move notation formatting
│   └── types.ts
└── theme/             # ThemeContext (cellSize, displayType, colors)
```
