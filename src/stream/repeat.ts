import { assertUint } from "../utils.ts";
import { Stream } from "./stream.ts";

/**
 * Repeatly emit the value for n times (default to Infinity).
 *
 * ```ts
 * repeat(1, 3); // [1, 1, 1]
 * repeat(1); // [1, 1, 1, 1, 1, ...]
 * ```
 */
export function repeat<T>(t: T, n: number = Infinity): Stream<T> {
  assertUint(n);

  let i = 0;
  return new Stream(
    new ReadableStream({
      pull(ctrl) {
        if (i++ >= n) ctrl.close();
        else ctrl.enqueue(t);
      },
    })
  );
}

/**
 * Repeatly call function and emit the return value for n times (default to Infinity).
 *
 * ```ts
 * repeatWith(() => 1, 3); // [1, 1, 1]
 * repeatWith(() => 1); // [1, 1, 1, 1, 1, ...]
 * ```
 */
export function repeatWith<T>(fn: () => T, n: number = Infinity): Stream<T> {
  assertUint(n);

  let i = 0;
  return new Stream(
    new ReadableStream({
      pull(ctrl) {
        if (i++ >= n) ctrl.close();
        else ctrl.enqueue(fn());
      },
    })
  );
}
