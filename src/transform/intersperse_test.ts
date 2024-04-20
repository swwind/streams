import { assertEquals } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { intersperse, intersperseWith } from "./intersperse.ts";

Deno.test("intersperse", async () => {
  assertEquals(
    await from([2, 3, 5]).pipe(intersperse(1)).collect(),
    [2, 1, 3, 1, 5],
  );
  assertEquals(await from([]).pipe(intersperse(1)).collect(), []);
});

Deno.test("intersperseWith", async () => {
  let i = 0;
  assertEquals(
    await from([2, 3, 5])
      .pipe(intersperseWith(() => ++i))
      .collect(),
    [2, 1, 3, 2, 5],
  );

  assertEquals(
    await from([])
      .pipe(intersperseWith(() => ++i))
      .collect(),
    [],
  );
});
