import { assertUint } from "../utils.ts";

/**
 * Skip first n items
 *
 * ```ts
 * from([1, 1, 4, 5, 1, 4])
 *   .pipe(skip(3))
 * // [5, 1, 4]
 * ```
 */
export function skip<T>(n: number): TransformStream<T, T> {
  assertUint(n);

  let i = 0;

  return new TransformStream({
    transform(chunk, ctrl) {
      if (i++ >= n) {
        ctrl.enqueue(chunk);
      }
    },
  });
}

/**
 * Skip items while predict matches
 *
 * ```ts
 * from([1, 1, 4, 5, 1, 4])
 *   .pipe(skipWhile((x) => x === 1))
 * // [4, 5, 1, 4]
 * ```
 */
export function skipWhile<T>(
  predict: (t: T) => boolean
): TransformStream<T, T> {
  let skipping = true;

  return new TransformStream({
    transform(chunk, ctrl) {
      if (skipping) {
        skipping = predict(chunk);
      }
      if (!skipping) {
        ctrl.enqueue(chunk);
      }
    },
  });
}
