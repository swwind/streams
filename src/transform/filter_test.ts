import { assertEquals } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { filter } from "./filter.ts";
import { map } from "./map.ts";

Deno.test("filter", async () => {
  assertEquals(
    await from([2, 3, 5])
      .pipe(filter((x) => x % 2 === 1))
      .collect(),
    [3, 5],
  );

  assertEquals(
    await from(["2", 3, 4, "5"])
      .pipe(filter((x): x is string => typeof x === "string"))
      .pipe(map((x) => parseInt(x)))
      .collect(),
    [2, 5],
  );
});
