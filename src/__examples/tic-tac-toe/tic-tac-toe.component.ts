import {
  $log,
  combineLatest,
  createMulticastSource, debounceMicrotask$$$,
  IObservable,
  IObserver,
  let$$,
  map$$, pipe$$,
  shareRL$$, shareRL$$$,
  switchMap$$, switchMap$$$,
  tuple,
} from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualDOMNode } from '@lirx/dom';
import { TicTacToeCellComponent } from './components/cell/tic-tac-toe-cell.component';
import { createTicTacToeMatrix } from './functions/create-tic-tac-toe-matrix';
import { getTicTacToeMatrixWinner } from './functions/get-tic-tac-toe-matrix-winner';
import { updateTicTacToeMatrix } from './functions/update-tic-tac-toe-matrix';
import { TicTacToeCellState, TicTacToeMatrix, TicTacToePlayer, TicTacToeWinner } from './types/types';

// @ts-ignore
import html from './tic-tac-toe.component.html?raw';
// @ts-ignore
import style from './tic-tac-toe.component.scss?inline';

/**
 * COMPONENT: 'app-tic-tac-toe'
 */

interface IOnSelected {
  (
    node: VirtualDOMNode,
    rowIndex$: IObservable<number>,
    columnIndex$: IObservable<number>,
  ): IObserver<void>;
}

interface IData {
  readonly matrix$: IObservable<TicTacToeMatrix>;
  readonly player$: IObservable<TicTacToePlayer>;
  readonly $$onSelected: IOnSelected;
}

interface IMatBadgeComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const TicTacToeComponent = createComponent<IMatBadgeComponentConfig>({
  name: 'app-tic-tac-toe',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      TicTacToeCellComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (): IData => {
    const { emit: $matrix, subscribe: matrix$ } = let$$<TicTacToeMatrix>(createTicTacToeMatrix());
    const { emit: $player, subscribe: player$ } = let$$<TicTacToePlayer>('player-1');

    const $$onSelected = (
      node: VirtualDOMNode,
      rowIndex$: IObservable<number>,
      columnIndex$: IObservable<number>,
    ): IObserver<void> => {
      const { emit: $onSelected, subscribe: onSelected$ } = createMulticastSource<void>();

      type IMatrixAndPlayer = readonly [TicTacToeMatrix, TicTacToePlayer];

      const newMatrixAndPlayer$ = pipe$$(
        combineLatest(tuple(matrix$, player$, rowIndex$, columnIndex$)),
        [
          debounceMicrotask$$$<any>(),
          switchMap$$$<any, IMatrixAndPlayer>(([matrix, player, rowIndex, columnIndex]): IObservable<IMatrixAndPlayer> => {
            console.log('map');
              return map$$(onSelected$, (): IMatrixAndPlayer => {
                const newMatrix: TicTacToeMatrix = updateTicTacToeMatrix(
                  matrix,
                  rowIndex,
                  columnIndex,
                  player,
                );

                const newPlayer: TicTacToePlayer = (player === 'player-1')
                  ? 'player-2'
                  : 'player-1';

                return [
                  newMatrix,
                  newPlayer,
                ];
              });
            },
          ),
          shareRL$$$<IMatrixAndPlayer>(),
        ]
      );

      const newMatrix$ = map$$(newMatrixAndPlayer$, ([matrix]) => matrix);
      const newPlayer$ = map$$(newMatrixAndPlayer$, ([, player]) => player);

      newMatrixAndPlayer$($log);

      // newMatrix$($matrix);
      // newPlayer$($player);
      node.onConnected$(newMatrix$)($matrix);
      node.onConnected$(newPlayer$)($player);

      return $onSelected;
    };

    const winner$ = map$$(matrix$, getTicTacToeMatrixWinner);

    // winner$($log);

    return {
      matrix$,
      player$,
      $$onSelected,
    };
  },
});
