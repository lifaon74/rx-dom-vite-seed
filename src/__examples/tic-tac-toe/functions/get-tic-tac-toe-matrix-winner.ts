import { TicTacToeCellState, TicTacToeMatrix, TicTacToeWinner } from '../types/types';

function getTicTacToeMatrixEstWestWinner(
  matrix: TicTacToeMatrix,
  rowsCount: number,
  columnsCount: number,
  consecutiveToWin: number,
): TicTacToeWinner {
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    let lastCellSate: TicTacToeCellState = 'empty';
    let count: number = 0;

    for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
      const state: TicTacToeCellState = matrix[rowIndex][columnIndex];
      if (state === 'empty') {
        count = 0;
      } else {
        if (state === lastCellSate) {
          count++;
          if (count >= consecutiveToWin) {
            return state;
          }
        } else {
          count = 1;
        }
      }
      lastCellSate = state;
    }
  }

  return 'none';
}

function getTicTacToeMatrixNorthSouthWinner(
  matrix: TicTacToeMatrix,
  rowsCount: number,
  columnsCount: number,
  consecutiveToWin: number,
): TicTacToeWinner {
  for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
    let lastCellSate: TicTacToeCellState = 'empty';
    let count: number = 0;

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      const state: TicTacToeCellState = matrix[rowIndex][columnIndex];
      if (state === 'empty') {
        count = 0;
      } else {
        if (state === lastCellSate) {
          count++;
          if (count >= consecutiveToWin) {
            return state;
          }
        } else {
          count = 1;
        }
      }
      lastCellSate = state;
    }
  }

  return 'none';
}

function getTicTacToeMatrixCrossWinner(
  matrix: TicTacToeMatrix,
  rowsCount: number,
  columnsCount: number,
  consecutiveToWin: number,
): TicTacToeWinner {
  if (
    (matrix[0][0] !== 'empty')
    && (matrix[0][0] === matrix[1][1])
    && (matrix[0][0] === matrix[2][2])
  ) {
    return matrix[0][0];
  }

  if (
    (matrix[2][0] !== 'empty')
    && (matrix[2][0] === matrix[1][1])
    && (matrix[2][0] === matrix[0][2])
  ) {
    return matrix[2][0];
  }

  return 'none';
}

function getTicTacToeMatrixDrawWinner(
  matrix: TicTacToeMatrix,
  rowsCount: number,
  columnsCount: number,
  consecutiveToWin: number,
): TicTacToeWinner {
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
      const state: TicTacToeCellState = matrix[rowIndex][columnIndex];
      if (state === 'empty') {
        return 'none';
      }
    }
  }

  return 'draw';
}

export function getTicTacToeMatrixWinner(
  matrix: TicTacToeMatrix,
  consecutiveToWin: number = 3,
): TicTacToeWinner {
  const rowsCount: number = matrix.length;
  const columnsCount: number = matrix[0].length;

  let winner: TicTacToeWinner;

  if ((winner = getTicTacToeMatrixEstWestWinner(matrix, rowsCount, columnsCount, consecutiveToWin)) !== 'none') {
    return winner;
  }

  if ((winner = getTicTacToeMatrixNorthSouthWinner(matrix, rowsCount, columnsCount, consecutiveToWin)) !== 'none') {
    return winner;
  }

  if ((winner = getTicTacToeMatrixCrossWinner(matrix, rowsCount, columnsCount, consecutiveToWin)) !== 'none') {
    return winner;
  }

  if ((winner = getTicTacToeMatrixDrawWinner(matrix, rowsCount, columnsCount, consecutiveToWin)) !== 'none') {
    return winner;
  }

  return 'none';
}
