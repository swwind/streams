import { assertEquals } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { chunks, chunkBy } from "./chunks.ts";

Deno.test("chunks", async () => {
  assertEquals(
    await from([2, 3, 5, 6, 1, 2, 4, 5, 4, 3]).pipe(chunks(3)).collect(),
    [[2, 3, 5], [6, 1, 2], [4, 5, 4], [3]]
  );
});

Deno.test("chunkBy", async () => {
  assertEquals(
    await from([1, 1, 1, 1, 2, 2, 3, 3, 3])
      .pipe(chunkBy((a, b) => a === b))
      .collect(),
    [
      [1, 1, 1, 1],
      [2, 2],
      [3, 3, 3],
    ]
  );
});
