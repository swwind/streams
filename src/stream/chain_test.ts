import { assertEquals } from "jsr:@std/assert";
import { from } from "./from.ts";
import { chain } from "./chain.ts";

Deno.test("chain", async () => {
  const stream1 = from([1, 2, 3]);
  const stream2 = from([4, 5, 6]);
  const stream = chain(stream1, stream2);

  assertEquals(await stream.collect(), [1, 2, 3, 4, 5, 6]);
});
