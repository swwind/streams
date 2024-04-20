/**
 * Intersperse given item between every items.
 *
 * ```ts
 * from([3, 4, 2])
 *   .pipe(intersperse(1))
 * // [3, 1, 4, 1, 2]
 * ```
 */
export function intersperse<T>(t: T): TransformStream<T, T> {
  let isFirst = true;

  return new TransformStream({
    transform(chunk, ctrl) {
      if (isFirst) {
        ctrl.enqueue(chunk);
        isFirst = false;
        return;
      }

      ctrl.enqueue(t);
      ctrl.enqueue(chunk);
    },
  });
}

/**
 * Intersperse return value of fn between every items.
 *
 * ```ts
 * from([3, 4, 2])
 *   .pipe(intersperse(() => Math.random()))
 * // [3, 0.1212512, 4, 0.6876172, 2]
 * ```
 */
export function intersperseWith<T>(fn: () => T): TransformStream<T, T> {
  let isFirst = true;

  return new TransformStream({
    transform(chunk, ctrl) {
      if (isFirst) {
        ctrl.enqueue(chunk);
        isFirst = false;
        return;
      }

      ctrl.enqueue(fn());
      ctrl.enqueue(chunk);
    },
  });
}
