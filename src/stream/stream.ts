import { assertUint } from "../utils.ts";

/**
 * A simple wrapper for ReadableStream
 *
 * ```ts
 * const stream = new Stream(new ReadableStream({ ... }));
 * const readableStream = stream.stream();
 * ```
 */
export class Stream<T> {
  private _readableStream: ReadableStream<T>;

  constructor(stream: ReadableStream<T>) {
    this._readableStream = stream;
  }

  /**
   * Clone the current Stream
   *
   * Use `ReadableStream.prototype.tee` under the hood.
   */
  clone(): Stream<T> {
    const [a, b] = this._readableStream.tee();
    this._readableStream = a;
    return new Stream(b);
  }

  /**
   * Pipe the stream through a transformer
   *
   * Use `ReadableStream.prototype.pipeThrough` under the hood.
   */
  pipe<R>(transformer: TransformStream<T, R>): Stream<R> {
    return new Stream(this._readableStream.pipeThrough(transformer));
  }

  /**
   * A AsyncGenerator for reading contents.
   *
   * ```ts
   * for await (const item of stream.values()) {
   *   console.log(item);
   * }
   * ```
   */
  async *values(): AsyncGenerator<T, void, void> {
    const reader = this._readableStream.getReader();
    try {
      while (true) {
        const next = await reader.read();
        if (next.done) break;
        yield next.value;
      }
    } finally {
      reader.releaseLock();
    }
  }

  [Symbol.asyncIterator](): AsyncGenerator<T, void, void> {
    return this.values();
  }

  /**
   * Consume and collect all items, return as an Array.
   */
  async collect(): Promise<T[]> {
    const array: T[] = [];
    for await (const item of this.values()) {
      array.push(item);
    }
    return array;
  }

  /**
   * Consume and invoke callback for every items.
   *
   * Awaited callback before next item.
   */
  async forEach(callback: (t: T) => void | Promise<void>): Promise<void> {
    for await (const item of this.values()) {
      await callback(item);
    }
  }

  /**
   * Get the ReadableStream
   */
  stream(): ReadableStream<T> {
    return this._readableStream;
  }

  /**
   * Consume and count how many items
   *
   * ```ts
   * const stream = from([2, 3, 4]);
   * assertEquals(await stream.count(), 3);
   * ```
   */
  async count(): Promise<number> {
    let total = 0;
    for await (const _ of this.values()) {
      ++total;
    }
    return total;
  }

  /**
   * Consume and get the n-th item and stop.
   *
   * ```ts
   * const stream = from([1, 2, 3, 4, 5]);
   *
   * assertEquals(await stream.nth(0), 1);
   * assertEquals(await stream.nth(1), 3);
   * assertEquals(await stream.nth(1), 5);
   * assertEquals(await stream.nth(0), undefined);
   * ```
   */
  async nth(n: number): Promise<T | undefined> {
    assertUint(n);

    const reader = this._readableStream.getReader();

    try {
      let final: T | undefined = undefined;
      for (let i = 0; i <= n; ++i) {
        const current = await reader.read();
        if (current.done) return undefined;
        final = current.value;
      }
      return final;
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Calls the specified callback function for all the items in a stream,
   * and returns the final computed value.
   *
   *
   * ```ts
   * const min = stream.clone().reduce(Math.min, Infinity);
   * const max = stream.clone().reduce(Math.max, -Infinity);
   * ```
   */
  async reduce<R>(fn: (prev: R, current: T) => R | Promise<R>, init: R) {
    for await (const item of this.values()) {
      init = await fn(init, item);
    }
    return init;
  }
}
