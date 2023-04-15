import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getRandomArrayElement, getRandomArrayElements } from './getRandom';

const sampleArray = [1, 2, 3, 4];

beforeEach(async () => {
  vi.restoreAllMocks();
});

describe('Get Random Array Element', () => {
  it('should return one random value of an array', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const result = getRandomArrayElement(sampleArray);

    expect(result).toBe(3);
  });

  it('should return undefined if the array is empty', () => {
    const result = getRandomArrayElement([]);

    expect(result).toBe(undefined);
  });
});

describe('Get Random Array Elements', () => {
  it('should return multiple elements from an array', () => {
    const result = getRandomArrayElements(sampleArray, 2);

    expect(result).toHaveLength(2);
  });

  it('should return multiple random elements from an array', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const result = getRandomArrayElements(sampleArray, 2);

    expect(result).toStrictEqual([3, 2]);
  });

  it('should return original array if length of array is less than elements asked for', () => {
    const result = getRandomArrayElements(sampleArray, 4);

    expect(result).toBe(sampleArray);
  });
});
