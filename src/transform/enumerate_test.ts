import { assertEquals } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { enumerate } from "./enumerate.ts";

Deno.test("enumerate", async () => {
  assertEquals(await from([2, 3, 5]).pipe(enumerate()).collect(), [
    [0, 2],
    [1, 3],
    [2, 5],
  ]);
});
