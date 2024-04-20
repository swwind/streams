import { assertNonZeroUint } from "../utils.ts";

/**
 * Create a window slices every n items.
 *
 * ```ts
 * from([1, 2, 3, 4])
 *   .pipe(windows(2))
 * // [[1, 2], [2, 3], [3, 4]]
 *
 * from([1, 2])
 *   .pipe(windows(4))
 * // []
 * ```
 */
export function windows<T>(n: number): TransformStream<T, T[]> {
  assertNonZeroUint(n);

  let cache: T[] = [];

  return new TransformStream({
    transform(chunk, ctrl) {
      cache.push(chunk);

      if (cache.length === n) {
        ctrl.enqueue(cache);
        cache = [...cache.slice(1)];
      }
    },
  });
}
