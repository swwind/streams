import { assertEquals } from "jsr:@std/assert";
import { Stream } from "./stream.ts";
import { from } from "./from.ts";
import { range } from "./range.ts";
import { map } from "../transform/map.ts";
import { take } from "../transform/take.ts";

Deno.test("Stream::constructor", async () => {
  assertEquals(
    await new Stream<number>(
      new ReadableStream({
        pull(ctrl) {
          ctrl.enqueue(1);
          ctrl.enqueue(2);
          ctrl.close();
        },
      })
    ).collect(),
    [1, 2]
  );
});

Deno.test("Stream::clone", async () => {
  const stream = from([2, 3, 4]);

  assertEquals(await stream.clone().collect(), [2, 3, 4]);
  assertEquals(await stream.clone().collect(), [2, 3, 4]);
  assertEquals(await stream.clone().collect(), [2, 3, 4]);

  assertEquals(await stream.collect(), [2, 3, 4]);
});

Deno.test("Stream::pipe", async () => {
  const stream = from([2, 3, 4]).pipe(map((x) => x * 2));
  assertEquals(await stream.collect(), [4, 6, 8]);
});

Deno.test("Stream::[@@asyncIterator]", async () => {
  const stream = from([2, 3, 4]).pipe(map((x) => x * 2));
  const expected = [4, 6, 8];

  for await (const item of stream) {
    assertEquals(item, expected.shift());
  }
});

Deno.test("Stream::collect", async () => {
  const stream = from([2, 3, 4]).pipe(map((x) => x * 2));
  assertEquals(await stream.collect(), [4, 6, 8]);
});

Deno.test("Stream::forEach", async () => {
  const stream = from([2, 3, 4]).pipe(map((x) => x * 2));
  const expected = [4, 6, 8];

  await stream.forEach((item) => {
    assertEquals(item, expected.shift());
  });
});

Deno.test("Stream::count", async () => {
  assertEquals(await range(0).pipe(take(20)).count(), 20);
});

Deno.test("Stream::nth", async () => {
  const stream = from([1, 2, 3, 4, 5, 6]);
  assertEquals(await stream.nth(0), 1);
  assertEquals(await stream.nth(0), 2);
  assertEquals(await stream.nth(2), 5);
  assertEquals(await stream.nth(2), undefined);
  assertEquals(await stream.nth(2), undefined);
  assertEquals(await stream.nth(2), undefined);
});

Deno.test("Stream::reduce", async () => {
  const stream = from([1, 2, 3, 4, 5, 6]);

  assertEquals(await stream.clone().reduce((a, b) => a + b, 0), 21);
  assertEquals(await stream.clone().reduce((a, b) => a * b, 1), 720);

  assertEquals(await stream.clone().reduce(Math.max, -Infinity), 6);
  assertEquals(await stream.clone().reduce(Math.min, Infinity), 1);
});
