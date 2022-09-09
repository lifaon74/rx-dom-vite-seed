import { TicTacToeCellState, TicTacToeMatrix } from '../types/types';

export function createTicTacToeMatrix(
  rows: number = 3,
  columns: number = 3,
): TicTacToeMatrix {
  return Array.from({ length: rows }, (): TicTacToeCellState[] => {
    return Array.from({ length: columns }, (): TicTacToeCellState => {
      return 'empty';
    });
  });
}
