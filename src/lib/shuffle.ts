/**
 * Returns a new array with the items shuffled using the Fisher-Yates algorithm.
 * The input array is not mutated.
 */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/** Small deterministic PRNG (mulberry32) producing values in [0, 1). */
function mulberry32(seed: number): () => number {
  let state = seed | 0;

  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a new array shuffled deterministically from a seed, so the same seed
 * always yields the same order. Used to keep answer order stable per question.
 */
export function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
