import { $log } from '@lirx/core';
import { numberRangeConstraint } from './constraints/built-in/number/number-range-constraint';
import { requiredConstraint } from './constraints/built-in/other/required-constraint';
import { patternConstraint } from './constraints/built-in/string/pattern-constraint';
import { FormGroup } from './form-group/form-group.class';
import { FormInputNumber } from './form-input/built-in/form-input-number/form-input-number.class';
import { FormInputText } from './form-input/built-in/form-input-text/form-input-text.class';
import { NO_VALUE_TOKEN } from './tokens/no-value.token';

/*------------------------------*/

/*------------------------------*/

async function formControlExample1() {
  const stringConstraint = () => {
    const constraint = requiredConstraint(
      true,
      patternConstraint(/.+/),
    );

    console.log(constraint.test('a'));
    console.log(constraint.test(''));
    console.log(constraint.test(NO_VALUE_TOKEN));
    // console.log(constraint.test(4));

  };

  const numberConstraint = () => {
    const constraint = numberRangeConstraint({
      step: 0.2,
    });

    console.log(constraint.test(4.2));
  };

  // stringConstraint();
  numberConstraint();
}

async function formControlExample2() {
  const inputText = new FormInputText('abc', {
    pattern: /.+/,
    required: false,
  });

  inputText.isValid$($log);
  (window as any).inputText = inputText;
}

async function formControlExample3() {
  const inputNumber = new FormInputNumber('abc', {
    min: 0,
    max: 10,
    step: 1,
  });

  inputNumber.validity$($log);
  inputNumber.isValid$($log);
  (window as any).inputNumber = inputNumber;
}

async function formControlExample4() {

  const group = new FormGroup([
    new FormInputText('abc'),
    new FormInputNumber('def'),
  ]);

  const a = group.get('abc').name;
}

async function formControlExample5() {
  // TODO continue here

  /*
  séparer les inputs des validateurs:
    inputs:
      - text input:
        - inputs:
          - value: string
          - valid: boolean
        - outputs:
          - valueChange: string
      - number input => utilise un text input mais avec un style different
        - inputs:
          - value: number
          - valid: boolean
        - outputs:
          - valueChange: string

    validateurs:
      - min validateur =>
   */

  interface IValidator {
    (
      input: any,
    ): string[]; // list of errors translated
  }
}
/*------------------------------*/

export async function formControlExample() {
  // await formControlExample1();
  await formControlExample2();
  // await formControlExample3();
}
