import { $log, combineLatest, empty, function$$, IObservable, map$$, noop, switchMap$$, tuple } from '@lirx/core';
import { compileStyleAsComponentStyle, createComponent, IClassNamesList, VirtualCustomElementNode } from '@lirx/dom';
import { TicTacToeCellState, TicTacToePlayer } from '../../types/types';

// @ts-ignore
import style from './tic-tac-toe-cell.component.scss?inline';

/**
 * COMPONENT: 'app-tic-tac-toe-cell'
 */

interface ITicTacToeCellComponentConfig {
  inputs: [
    ['state', TicTacToeCellState],
    ['player', TicTacToePlayer],
  ];
  outputs: [
    ['onSelected', void],
  ];
}

export const TicTacToeCellComponent = createComponent<ITicTacToeCellComponentConfig>({
  name: 'app-tic-tac-toe-cell',
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['state', 'empty'],
    ['player'],
  ],
  outputs: [
    'onSelected',
  ],
  init: (node: VirtualCustomElementNode<ITicTacToeCellComponentConfig>): void => {
    // get inputs
    const state$ = node.inputs.get$('state');
    const player$ = node.inputs.get$('player');

    // get outputs
    const $onSelected = node.outputs.$set('onSelected');

    /*--*/

    // creates an Observable from state$ and player$ to define the class of this node
    const classNamesList$ = function$$(
      [state$, player$],
      (state: TicTacToeCellState, player: TicTacToePlayer): IClassNamesList => {
        return new Set([
          `state-${state}`,
          `turn-${player}`,
        ]);
      });

    // apply the class to this node
    node.setReactiveClassNamesList(classNamesList$);

    /*--*/

    // creates an Observable emitting when the user clicks on this cell if empty
    const onSelected$ = switchMap$$(state$, (state: TicTacToeCellState): IObservable<void> => {
      return (state === 'empty')
        ? map$$(node.on$('click'), noop)
        : empty<void>();
    });

    node.onConnected$(onSelected$)($onSelected);
  },
});
