/**
 * @module
 *
 * Make ReadableStream API more like functional
 *
 * # Example
 *
 * ```ts
 * await from([2, 3, 4, 5, 6])
 *   .pipe(map((x) => x * 2))
 *   .pipe(filter((x) => x % 3 === 0))
 *   .collect(); // => [6, 12]
 * ```
 */

export { Stream } from "./src/stream/stream.ts";

export { zip } from "./src/stream/zip.ts";
export { from } from "./src/stream/from.ts";
export { chain } from "./src/stream/chain.ts";
export { range } from "./src/stream/range.ts";
export { repeat, repeatWith } from "./src/stream/repeat.ts";

export { filter } from "./src/transform/filter.ts";
export { stepBy } from "./src/transform/step.ts";
export { flatten } from "./src/transform/flatten.ts";
export { map, flatMap } from "./src/transform/map.ts";
export { enumerate } from "./src/transform/enumerate.ts";
export { take, takeWhile } from "./src/transform/take.ts";
export { skip, skipWhile } from "./src/transform/skip.ts";
export { intersperse, intersperseWith } from "./src/transform/intersperse.ts";
