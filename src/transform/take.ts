import { assertUint } from "../utils.ts";

/**
 * Take first n items
 *
 * ```ts
 * from([1, 1, 4, 5, 1, 4])
 *   .pipe(take(3))
 * // [1, 1, 4]
 * ```
 */
export function take<T>(n: number): TransformStream<T, T> {
  assertUint(n);

  let i = 0;
  return new TransformStream({
    start(ctrl) {
      if (i >= n) ctrl.terminate();
    },
    transform(chunk, ctrl) {
      ctrl.enqueue(chunk);
      if (++i >= n) ctrl.terminate();
    },
  });
}

/**
 * Take items while predict matches
 *
 * ```ts
 * from([1, 1, 4, 5, 1, 4])
 *   .pipe(takeWhile((x) => x === 1))
 * // [1, 1]
 * ```
 */
export function takeWhile<T>(
  predict: (t: T) => boolean
): TransformStream<T, T> {
  return new TransformStream({
    transform(chunk, ctrl) {
      if (predict(chunk)) {
        ctrl.enqueue(chunk);
      } else {
        ctrl.terminate();
      }
    },
  });
}
