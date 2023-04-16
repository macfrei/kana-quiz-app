import { describe, expect, it } from 'vitest';
import shuffle from './shuffle';

const sampleArray = [1, 2, 3, 4];

describe('Shuffle', () => {
  it('should return an array of the same length', () => {
    const result = shuffle(sampleArray);

    expect(result).toHaveLength(4);
  });

  it('should return undefined if passed array is empty', () => {
    const result = shuffle([]);

    expect(result).toBe(undefined);
  });
});
