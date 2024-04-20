import { assertEquals } from "jsr:@std/assert";
import { from } from "./from.ts";
import { zip } from "./zip.ts";
import { range } from "./range.ts";

Deno.test("zip", async () => {
  assertEquals(await zip(from([1, 2, 3]), from([4, 5, 6])).collect(), [
    [1, 4],
    [2, 5],
    [3, 6],
  ]);
  assertEquals(
    await zip(from([1, 2, 3]), from([4, 5, 6, 4, 5, 6, 7])).collect(),
    [
      [1, 4],
      [2, 5],
      [3, 6],
    ]
  );
  assertEquals(await zip(range(0), from([4, 5, 6])).collect(), [
    [0, 4],
    [1, 5],
    [2, 6],
  ]);
});
