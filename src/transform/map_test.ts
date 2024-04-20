import { assertEquals } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { flatMap, map } from "./map.ts";

Deno.test("map", async () => {
  assertEquals(
    await from([2, 3, 5, 7, 11])
      .pipe(map((x) => x * 2))
      .collect(),
    [4, 6, 10, 14, 22],
  );
  assertEquals(
    await from([2, 3, 5, 7, 11])
      .pipe(map((x) => Promise.resolve(x * 2)))
      .collect(),
    [4, 6, 10, 14, 22],
  );
});

Deno.test("flatMap", async () => {
  assertEquals(
    await from([2, 3, 5, 7, 11])
      .pipe(flatMap((x) => [x - 1, x, x + 1]))
      .collect(),
    [1, 2, 3, 2, 3, 4, 4, 5, 6, 6, 7, 8, 10, 11, 12],
  );

  assertEquals(
    await from([2, 3, 5, 7, 11])
      .pipe(flatMap((x) => Promise.resolve([x - 1, x, x + 1])))
      .collect(),
    [1, 2, 3, 2, 3, 4, 4, 5, 6, 6, 7, 8, 10, 11, 12],
  );
});
