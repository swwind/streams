/**
 * Prepend a index to all the items.
 *
 * ```ts
 * from(["a", "b", "c"])
 *   .pipe(enumerate())
 * // [[0, "a"], [1, "b"], [2, "c"]]
 * ```
 */
export function enumerate<T>(): TransformStream<T, [number, T]> {
  let i = 0;
  return new TransformStream({
    transform(chunk, ctrl) {
      ctrl.enqueue([i++, chunk]);
    },
  });
}
