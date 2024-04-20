import { assertEquals } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { range } from "../stream/range.ts";
import { stepBy } from "./step.ts";
import { take } from "./take.ts";

Deno.test("stepBy", async () => {
  assertEquals(
    await from([2, 3, 5, 7, 9]).pipe(stepBy(2)).collect(),
    [2, 5, 9]
  );

  assertEquals(
    await range(0).pipe(stepBy(4)).pipe(take(4)).collect(),
    [0, 4, 8, 12]
  );
});
