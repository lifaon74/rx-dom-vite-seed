// https://github.com/tc39/proposal-set-methods

// export function setIntersection<GValue>(
//   setA: Set<GValue>,
//   setB: Set<GValue>,
// ): Set<GValue> {
//   const output: Set<GValue> = new Set<GValue>();
//
//   const iteratorA: Iterator<GValue> = setA.values();
//   let resultA: IteratorResult<GValue>;
//   while (!(resultA = iteratorA.next()).done) {
//     if (setB.has(resultA.value)) {
//       output.add(resultA.value);
//     }
//   }
//
//   return output;
// }

export function setIntersection<GValue>(
  ...sets: readonly Set<GValue>[]
): Set<GValue> {
  const length: number = sets.length;

  if (length === 0) {
    return new Set<GValue>();
  } else {
    const output: Set<GValue> = new Set<GValue>(sets[0]);

    for (let i = 1; i < length; i++) {
      const set: Set<GValue> = sets[i];
      const iterator: Iterator<GValue> = output.values();
      let result: IteratorResult<GValue>;
      while (!(result = iterator.next()).done) {
        if (!set.has(result.value)) {
          output.delete(result.value);
        }
      }
    }

    return output;
  }
}

// export function setUnion<GValue>(
//   setA: Set<GValue>,
//   setB: Set<GValue>,
// ): Set<GValue> {
//   const output: Set<GValue> = new Set<GValue>();
//
//   const iteratorA: Iterator<GValue> = setA.values();
//   let resultA: IteratorResult<GValue>;
//   while (!(resultA = iteratorA.next()).done) {
//     output.add(resultA.value);
//   }
//
//   const iteratorB: Iterator<GValue> = setB.values();
//   let resultB: IteratorResult<GValue>;
//   while (!(resultB = iteratorB.next()).done) {
//     output.add(resultB.value);
//   }
//
//   return output;
// }

export function setUnion<GValue>(
  ...sets: readonly Set<GValue>[]
): Set<GValue> {
  const length: number = sets.length;
  const output: Set<GValue> = new Set<GValue>();

  for (let i = 0; i < length; i++) {
    const set: Set<GValue> = sets[i];
    const iterator: Iterator<GValue> = set.values();
    let result: IteratorResult<GValue>;
    while (!(result = iterator.next()).done) {
      output.add(result.value);
    }
  }

  return output;
}

// export function setDifference<GValue>(
//   setA: Set<GValue>,
//   setB: Set<GValue>,
// ): Set<GValue> {
//   const output: Set<GValue> = new Set<GValue>();
//
//   const iteratorA: Iterator<GValue> = setA.values();
//   let resultA: IteratorResult<GValue>;
//   while (!(resultA = iteratorA.next()).done) {
//     if (!setB.has(resultA.value)) {
//       output.add(resultA.value);
//     }
//   }
//
//   return output;
// }

export function setDifference<GValue>(
  ...sets: readonly Set<GValue>[]
): Set<GValue> {
  const length: number = sets.length;

  if (length === 0) {
    return new Set<GValue>();
  } else {
    const output: Set<GValue> = new Set<GValue>(sets[0]);

    for (let i = 1; i < length; i++) {
      const set: Set<GValue> = sets[i];
      const iterator: Iterator<GValue> = set.values();
      let result: IteratorResult<GValue>;
      while (!(result = iterator.next()).done) {
        output.delete(result.value);
      }
    }

    return output;
  }
}

// export function setSymmetricDifference<GValue>(
//   setA: Set<GValue>,
//   setB: Set<GValue>,
// ): Set<GValue> {
//   const output: Set<GValue> = new Set<GValue>();
//
//   const iteratorA: Iterator<GValue> = setA.values();
//   let resultA: IteratorResult<GValue>;
//   while (!(resultA = iteratorA.next()).done) {
//     if (!setB.has(resultA.value)) {
//       output.add(resultA.value);
//     }
//   }
//
//   const iteratorB: Iterator<GValue> = setB.values();
//   let resultB: IteratorResult<GValue>;
//   while (!(resultB = iteratorB.next()).done) {
//     if (!setA.has(resultB.value)) {
//       output.add(resultB.value);
//     }
//   }
//
//   return output;
// }


export function setSymmetricDifference<GValue>(
  ...sets: readonly Set<GValue>[]
): Set<GValue> {
  const length: number = sets.length;
  const output: Set<GValue> = new Set<GValue>();

  for (let i = 0; i < length; i++) {
    const set: Set<GValue> = sets[i];
    const iterator: Iterator<GValue> = set.values();
    let result: IteratorResult<GValue>;
    while (!(result = iterator.next()).done) {
      if (output.has(result.value)) {
        output.delete(result.value);
      } else {
        output.add(result.value);
      }
    }
  }

  return output;
}


