# `@swwind/streams`

Make `ReadableStream` API more functional

```ts
await from([2, 3, 4, 5, 6])
  .pipe(map((x) => x * 2))
  .pipe(filter((x) => x % 3 === 0))
  .collect(); // => [6, 12]
```

For more information, please goto [docs](jsr.io/@swwind/streams).
