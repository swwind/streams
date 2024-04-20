import { Stream } from "./stream.ts";

/**
 * Create a zipped stream
 *
 * ```ts
 * zip(from([1, 2, 3]), from([4, 5, 6]));
 * // [[1, 4], [2, 5], [3, 6]]
 * ```
 */
export function zip<T1>(stream1: Stream<T1>): Stream<[T1]>;
export function zip<T1, T2>(
  stream1: Stream<T1>,
  stream2: Stream<T2>
): Stream<[T1, T2]>;
export function zip<T1, T2, T3>(
  stream1: Stream<T1>,
  stream2: Stream<T2>,
  stream3: Stream<T3>
): Stream<[T1, T2, T3]>;
export function zip<T1, T2, T3, T4>(
  stream1: Stream<T1>,
  stream2: Stream<T2>,
  stream3: Stream<T3>,
  stream4: Stream<T4>
): Stream<[T1, T2, T3, T4]>;
export function zip<T1, T2, T3, T4, T5>(
  stream1: Stream<T1>,
  stream2: Stream<T2>,
  stream3: Stream<T3>,
  stream4: Stream<T4>,
  stream5: Stream<T5>
): Stream<[T1, T2, T3, T4, T5]>;
export function zip<T1, T2, T3, T4, T5, T6>(
  stream1: Stream<T1>,
  stream2: Stream<T2>,
  stream3: Stream<T3>,
  stream4: Stream<T4>,
  stream5: Stream<T5>,
  stream6: Stream<T6>
): Stream<[T1, T2, T3, T4, T5, T6]>;
export function zip<T1, T2, T3, T4, T5, T6, T7>(
  stream1: Stream<T1>,
  stream2: Stream<T2>,
  stream3: Stream<T3>,
  stream4: Stream<T4>,
  stream5: Stream<T5>,
  stream6: Stream<T6>,
  stream7: Stream<T7>
): Stream<[T1, T2, T3, T4, T5, T6, T7]>;
export function zip<T1, T2, T3, T4, T5, T6, T7, T8>(
  stream1: Stream<T1>,
  stream2: Stream<T2>,
  stream3: Stream<T3>,
  stream4: Stream<T4>,
  stream5: Stream<T5>,
  stream6: Stream<T6>,
  stream7: Stream<T7>,
  stream8: Stream<T8>
): Stream<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function zip<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  stream1: Stream<T1>,
  stream2: Stream<T2>,
  stream3: Stream<T3>,
  stream4: Stream<T4>,
  stream5: Stream<T5>,
  stream6: Stream<T6>,
  stream7: Stream<T7>,
  stream8: Stream<T8>,
  stream9: Stream<T9>
): Stream<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function zip<T>(...streams: Stream<T>[]): Stream<T[]>;
export function zip<T>(...streams: Stream<T>[]): Stream<T[]> {
  const readers = streams.map((stream) => stream.stream().getReader());

  return new Stream(
    new ReadableStream({
      async pull(ctrl) {
        const nexts = await Promise.all(readers.map((x) => x.read()));

        if (nexts.some((x) => x.done)) {
          await Promise.all(readers.map((x) => x.cancel()));
          ctrl.close();
          return;
        }

        ctrl.enqueue(nexts.map((x) => x.value!));
      },
    })
  );
}
