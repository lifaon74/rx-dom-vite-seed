import { createConstraint } from './create-constraint';

export const NO_CONSTRAINT = createConstraint<any, any>(() => [], {});
