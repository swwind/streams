import { assertNonZeroUint } from "../utils.ts";
import { Stream } from "./stream.ts";

/**
 * Emit a range of value from `start` to `end` and step by `step`.
 *
 * ```ts
 * range(0); // [0, 1, 2, 3, 4, ...]
 * range(0, 3); // [0, 1, 2]
 * range(0, 5, 2); // [0, 2, 4]
 * ```
 *
 * @param [end=Infinity] defaults to Infinity
 * @param [step=1] defaults to 1
 */
export function range(
  start: number,
  end: number = Infinity,
  step: number = 1
): Stream<number> {
  assertNonZeroUint(step);

  let i = start;

  return new Stream(
    new ReadableStream({
      pull(ctrl) {
        if (i < end) {
          ctrl.enqueue(i);
          i += step;
        } else {
          ctrl.close();
        }
      },
    })
  );
}
