export type TicTacToePlayer =
  | 'player-1'
  | 'player-2'
  ;

export type TicTacToeCellState =
  | 'empty'
  | TicTacToePlayer
  ;

export type TicTacToeWinner =
  | 'none'
  | 'draw'
  | TicTacToePlayer
  ;

export type TicTacToeMatrixColumns = readonly TicTacToeCellState[];

export type TicTacToeMatrix = readonly TicTacToeMatrixColumns[]; // [row, column]
