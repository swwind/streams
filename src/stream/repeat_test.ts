import { assertEquals } from "jsr:@std/assert";
import { repeat, repeatWith } from "./repeat.ts";
import { take } from "../transform/take.ts";

Deno.test("repeat", async () => {
  assertEquals(await repeat(2).pipe(take(5)).collect(), [2, 2, 2, 2, 2]);
  assertEquals(await repeat(0, 5).collect(), [0, 0, 0, 0, 0]);
});

Deno.test("repeatWith", async () => {
  assertEquals(
    await repeatWith(() => 2)
      .pipe(take(5))
      .collect(),
    [2, 2, 2, 2, 2]
  );
  assertEquals(await repeatWith(() => 0, 5).collect(), [0, 0, 0, 0, 0]);
});
