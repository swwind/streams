import { assertEquals, assertThrows } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { skip, skipWhile } from "./skip.ts";

Deno.test("skip", async () => {
  assertEquals(
    await from([2, 3, 5, 7, 11]).pipe(skip(2)).collect(),
    [5, 7, 11],
  );

  assertEquals(
    await from([1, 1, 4, 5, 1, 4]).pipe(skip(0)).collect(),
    [1, 1, 4, 5, 1, 4],
  );

  assertThrows(() => skip(-1));
});

Deno.test("skipWhile", async () => {
  assertEquals(
    await from([2, 3, 5, 7, 11])
      .pipe(skipWhile((x) => x < 7))
      .collect(),
    [7, 11],
  );

  assertEquals(
    await from([1, 1, 4, 5, 1, 4])
      .pipe(skipWhile(() => true))
      .collect(),
    [],
  );
});
