import { assertNonZeroUint } from "../utils.ts";

/**
 * Step items by n
 *
 * ```ts
 * from([1, 2, 3, 4, 5, 6])
 *   .pipe(step(2))
 * // [1, 3, 5]
 * ```
 */
export function stepBy<T>(step: number): TransformStream<T, T> {
  assertNonZeroUint(step);

  let i = 0;

  return new TransformStream({
    transform(chunk, ctrl) {
      if (i === 0) ctrl.enqueue(chunk);
      i = (i + 1) % step;
    },
  });
}
