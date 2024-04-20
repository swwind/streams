/**
 * Flatten the stream
 *
 * ```ts
 * from([[1, 2, 3], [4, 5, 6]])
 *   .pipe(flatten())
 * // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function flatten<T>(): TransformStream<
  AsyncIterable<T> | Iterable<T>,
  T
> {
  return new TransformStream({
    async transform(chunk, ctrl) {
      const generator =
        Symbol.asyncIterator in chunk
          ? chunk[Symbol.asyncIterator]()
          : chunk[Symbol.iterator]();
      while (true) {
        const current = await generator.next();
        if (current.done) break;
        else ctrl.enqueue(current.value);
      }
    },
  });
}
