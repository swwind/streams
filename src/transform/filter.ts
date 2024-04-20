/**
 * Filter items which matches the predict function.
 *
 * ```ts
 * from([1, 1, 4, 5, 1, 4])
 *   .pipe(filter((x) => x === 1));
 * // [1, 1, 1]
 * ```
 */
export function filter<T, R extends T>(
  predict: (t: T) => t is R
): TransformStream<T, R>;
export function filter<T>(predict: (t: T) => boolean): TransformStream<T, T>;
export function filter<T, R extends T>(
  predict: (t: T) => boolean
): TransformStream<T, R> {
  return new TransformStream<T, R>({
    transform(chunk, ctrl) {
      if (predict(chunk)) {
        ctrl.enqueue(chunk as R);
      }
    },
  });
}
