import { $log, computed, DeepWritable, effect, IObservable, IObserver, ISignal, signal, single, toSignal } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualDOMNode,
  virtualNodeEffect,
} from '@lirx/dom';
import { VirtualCustomElementNode } from '@lirx/dom/src/virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { TicTacToeCellComponent } from './components/cell/tic-tac-toe-cell.component';
import { createTicTacToeMatrix } from './functions/create-tic-tac-toe-matrix';
import { getTicTacToeMatrixWinner } from './functions/get-tic-tac-toe-matrix-winner';
import { mutateTicTacToeMatrix, updateTicTacToeMatrix } from './functions/update-tic-tac-toe-matrix';

// @ts-ignore
import html from './tic-tac-toe.component.html?raw';
// @ts-ignore
import style from './tic-tac-toe.component.scss?inline';
import { TicTacToeMatrix, TicTacToePlayer } from './types/types';

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
  readonly matrix: ISignal<TicTacToeMatrix>;
  readonly player: ISignal<TicTacToePlayer>;
  readonly $$onSelected: IOnSelected;
  readonly $onClickResetButton: IObserver<any>;
}

interface ITicTacToeComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const TicTacToeComponent = createComponent<ITicTacToeComponentConfig>({
  name: 'app-tic-tac-toe',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      TicTacToeCellComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualCustomElementNode<ITicTacToeComponentConfig>): IData => {
    const matrix = signal<TicTacToeMatrix>(createTicTacToeMatrix());
    const player = signal<TicTacToePlayer>('player-1');
    const winner = computed(() => getTicTacToeMatrixWinner(matrix()));

    const $$onSelected = (
      node: VirtualDOMNode,
      rowIndex$: IObservable<number>,
      columnIndex$: IObservable<number>,
    ): IObserver<void> => {
      const rowIndex = toSignal(rowIndex$);
      const columnIndex = toSignal(columnIndex$);

      return () => {
        if (winner() === 'none') {
          matrix.update((matrix: TicTacToeMatrix): TicTacToeMatrix => {
            return updateTicTacToeMatrix(
              matrix,
              rowIndex(),
              columnIndex(),
              player(),
            );
          });

          player.update((player: TicTacToePlayer): TicTacToePlayer => {
            return (player === 'player-1')
              ? 'player-2'
              : 'player-1';
          });
        }
      };
    };

    const reset = (): void => {
      matrix.set(createTicTacToeMatrix());
      player.set('player-1');
    };


    const $onClickResetButton = reset;

    virtualNodeEffect(node, () => {
      if (winner() !== 'none') {
        alert(`winner: ${winner()}`);
      }

      node.setClass('playing', winner() === 'none')
    });


    return {
      matrix,
      player,
      $$onSelected,
      $onClickResetButton,
    };
  },
});