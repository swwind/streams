import { assertEquals } from "jsr:@std/assert";
import { take, takeWhile } from "./take.ts";
import { from } from "../stream/from.ts";
import { range } from "../stream/range.ts";

Deno.test("take", async () => {
  assertEquals(await from([2, 3, 4]).pipe(take(2)).collect(), [2, 3]);
  assertEquals(await from([1, 1, 4]).pipe(take(20)).collect(), [1, 1, 4]);
  assertEquals(await range(0, 10).pipe(take(2)).collect(), [0, 1]);
});

Deno.test("takeWhile", async () => {
  assertEquals(
    await from([2, 3, 4])
      .pipe(takeWhile((x) => x < 4))
      .collect(),
    [2, 3],
  );
  assertEquals(
    await from([1, 1, 4])
      .pipe(takeWhile(() => true))
      .collect(),
    [1, 1, 4],
  );
  assertEquals(
    await range(0, 10)
      .pipe(takeWhile((x) => x < 3))
      .collect(),
    [0, 1, 2],
  );
});
