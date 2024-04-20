import { assertEquals } from "jsr:@std/assert";
import { range } from "./range.ts";
import { take } from "../transform/take.ts";

Deno.test("range", async () => {
  assertEquals(await range(2).pipe(take(5)).collect(), [2, 3, 4, 5, 6]);
  assertEquals(await range(0, 5).collect(), [0, 1, 2, 3, 4]);
  assertEquals(await range(0, 5, 2).collect(), [0, 2, 4]);
});
