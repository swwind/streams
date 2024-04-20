import { assertEquals } from "jsr:@std/assert";
import { from } from "./from.ts";

Deno.test("from", async () => {
  assertEquals(await from([]).collect(), []);
  assertEquals(await from([2]).collect(), [2]);
  assertEquals(await from([2, 3]).collect(), [2, 3]);
  assertEquals(await from([2, 3, 5]).collect(), [2, 3, 5]);

  assertEquals(await from(new Set()).collect(), []);
  assertEquals(await from(new Set([1, 3, 4])).collect(), [1, 3, 4]);

  function* generator() {
    yield 1;
    yield 3;
  }

  assertEquals(await from(generator()).collect(), [1, 3]);

  async function* asyncGenerator() {
    yield Promise.resolve(1);
    yield Promise.resolve(4);
  }

  assertEquals(await from(asyncGenerator()).collect(), [1, 4]);
});
