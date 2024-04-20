/**
 * Map items through fn.
 *
 * ```ts
 * from([2, 3, 4])
 *   .pipe(map((x) => x * 2))
 * // [4, 6, 8]
 * ```
 */
export function map<T, R>(fn: (t: T) => R | Promise<R>): TransformStream<T, R> {
  return new TransformStream({
    async transform(chunk, ctrl) {
      const item = await fn(chunk);
      ctrl.enqueue(item);
    },
  });
}

/**
 * Map items through fn and flatten
 *
 * ```ts
 * from([2, 4, 5])
 *   .pipe(flatMap((x) => [x, -x]))
 * // [2, -2, 4, -4, 5, -5]
 * ```
 */
export function flatMap<T, R>(
  fn: (t: T) => R[] | Promise<R[]>
): TransformStream<T, R> {
  return new TransformStream({
    async transform(chunk, ctrl) {
      const list = await fn(chunk);
      for (const item of list) {
        ctrl.enqueue(item);
      }
    },
  });
}
