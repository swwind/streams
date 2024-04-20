import { assertEquals } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { windows } from "./windows.ts";

Deno.test("windows", async () => {
  assertEquals(await from(["j", "a", "v", "a"]).pipe(windows(2)).collect(), [
    ["j", "a"],
    ["a", "v"],
    ["v", "a"],
  ]);
});
