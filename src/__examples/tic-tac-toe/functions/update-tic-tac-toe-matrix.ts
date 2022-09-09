import { TicTacToeCellState, TicTacToeMatrix } from '../types/types';

export function updateTicTacToeMatrix(
  matrix: TicTacToeMatrix,
  rowIndex: number,
  columnIndex: number,
  state: TicTacToeCellState,
): TicTacToeMatrix {
  return [
    ...matrix.slice(0, rowIndex),
    [
      ...matrix[rowIndex].slice(0, columnIndex),
      state,
      ...matrix[rowIndex].slice(columnIndex + 1),
    ],
    ...matrix.slice(rowIndex + 1),
  ];
}


