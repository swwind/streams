import { assertNonZeroUint } from "../utils.ts";

/**
 * Chunk items every n items
 *
 * ```ts
 * from([1, 1, 4, 5, 1, 4, 1, 9])
 *   .pipe(chunks(3))
 * // [[1, 1, 4], [5, 1, 4], [1, 9]]
 * ```
 */
export function chunks<T>(n: number): TransformStream<T, T[]> {
  assertNonZeroUint(n);

  let cache: T[] = [];

  return new TransformStream({
    transform(chunk, ctrl) {
      cache.push(chunk);

      if (cache.length === n) {
        ctrl.enqueue(cache);
        cache = [];
      }
    },
    flush(ctrl) {
      if (cache.length > 0) {
        ctrl.enqueue(cache);
      }
    },
  });
}

/**
 * Chunk items using predict function
 *
 * ```ts
 * from([1, 1, 1, 1, 3, 3, 2, 2, 2])
 *   .pipe(chunkBy((a, b) => a === b))
 * // [[1, 1, 1, 1], [3, 3], [2, 2, 2]]
 * ```
 */
export function chunkBy<T>(
  predict: (a: T, b: T) => boolean
): TransformStream<T, T[]> {
  let cache: T[] = [];

  return new TransformStream({
    transform(chunk, ctrl) {
      if (cache.length > 0) {
        if (predict(cache[cache.length - 1], chunk)) {
          cache.push(chunk);
        } else {
          ctrl.enqueue(cache);
          cache = [chunk];
        }
      } else {
        cache.push(chunk);
      }
    },
    flush(ctrl) {
      if (cache.length > 0) {
        ctrl.enqueue(cache);
      }
    },
  });
}
