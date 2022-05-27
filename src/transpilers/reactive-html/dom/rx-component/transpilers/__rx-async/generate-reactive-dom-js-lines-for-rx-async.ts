import { ILines } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireCreateReactiveAsyncNodeKey,
  REQUIRE_CREATE_REACTIVE_ASYNC_NODE_CONSTANT,
} from '../../../../require-external/types/require-create-reactive-async-node.type';
import {
  IRequireNodeAppendChildKey,
  REQUIRE_NODE_APPEND_CHILD_CONSTANT,
} from '../../../../require-external/types/require-node-append-child.type';
import { IRequireToObservableKey, REQUIRE_TO_OBSERVABLE_CONSTANT } from '../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateJSLinesForRXAsync =
  | IRequireNodeAppendChildKey
  | IRequireCreateReactiveAsyncNodeKey
  | IRequireToObservableKey
  ;

export function generateJSLinesForRXAsync(
  expression: string,
  templatePending: string,
  templateFulfilled: string,
  templateRejected: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateJSLinesForRXAsync>,
): ILines {
  const nodeAppendChild: string = requireExternalFunction(REQUIRE_NODE_APPEND_CHILD_CONSTANT);
  const createReactiveAsyncNode: string = requireExternalFunction(REQUIRE_CREATE_REACTIVE_ASYNC_NODE_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive async`,
    `${nodeAppendChild}(parentNode, ${createReactiveAsyncNode}(${toObservable}(${expression}), ${templatePending}, ${templateFulfilled}, ${templateRejected}));`,
  ];
}
