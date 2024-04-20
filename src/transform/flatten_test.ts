import { assertEquals } from "jsr:@std/assert";
import { from } from "../stream/from.ts";
import { flatten } from "./flatten.ts";

Deno.test("flatten", async () => {
  assertEquals(
    await from([
      [2, 3],
      [4, 5],
      [6, 7],
    ])
      .pipe(flatten())
      .collect(),
    [2, 3, 4, 5, 6, 7],
  );

  async function* generate1() {
    yield 1;
    yield 1;
    yield 4;
  }

  async function* generate2() {
    yield 5;
    yield 1;
    yield 4;
  }

  assertEquals(
    await from([generate1(), generate2()]).pipe(flatten()).collect(),
    [1, 1, 4, 5, 1, 4],
  );
});
