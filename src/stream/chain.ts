import { Stream } from "./stream.ts";

/**
 * Concat two or more streams.
 *
 * ```ts
 * chain(from([1, 2, 3]), from([4, 5, 6]));
 * // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function chain<T>(...streams: Stream<T>[]): Stream<T> {
  let generator = streams.shift()?.values();

  return new Stream(
    new ReadableStream({
      async pull(ctrl) {
        while (generator) {
          const current = await generator.next();
          if (current.done) {
            generator = streams.shift()?.values();
          } else {
            ctrl.enqueue(current.value);
            return;
          }
        }
        ctrl.close();
      },
    })
  );
}
