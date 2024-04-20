import { Stream } from "./stream.ts";

/**
 * Get a stream from Iterable or AsyncIterable.
 *
 * ```ts
 * from([2, 3, 4]); // [2, 3, 4]
 * from(new Set([2, 3, 4])); // [2, 3, 4]
 * from((function *() { while (1) { yield 3 } })()); // [3, 3, 3, 3, 3, ...]
 * ```
 */
export function from<T>(iterable: AsyncIterable<T> | Iterable<T>): Stream<T> {
  // if (typeof ReadableStream.from === "function") {
  //   return new Stream(ReadableStream.from(iterable));
  // }

  const generator =
    Symbol.asyncIterator in iterable
      ? iterable[Symbol.asyncIterator]()
      : iterable[Symbol.iterator]();

  return new Stream(
    new ReadableStream<T>({
      async pull(ctrl) {
        const next = await generator.next();
        if (next.done) {
          ctrl.close();
        } else {
          ctrl.enqueue(next.value);
        }
      },
    })
  );
}
