export function assertUint(n: number) {
  if (isNaN(n)) {
    throw new TypeError("n cannot be NaN");
  }

  if (Number.isFinite(n) && !Number.isInteger(n)) {
    throw new TypeError("n should be an integer");
  }

  if (n < 0) {
    throw new TypeError("n should not be smaller than 0");
  }
}

export function assertNonZeroUint(n: number) {
  assertUint(n);

  if (n === 0) {
    throw new TypeError("n should not be 0");
  }
}
