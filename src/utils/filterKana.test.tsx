import { describe, expect, it } from 'vitest';
import filterKana from './filterKana';
import { TypeOfKana } from '../types/kana';

const sampleArray = [
  {
    id: 'h_a',
    pronunciation: 'A',
    kana: 'あ',
    type: TypeOfKana.basic,
    group: 'basic',
  },
  {
    id: 'h_du',
    pronunciation: 'DSU',
    kana: 'づ',
    type: TypeOfKana.tenten,
    group: 'd',
  },
  {
    id: 'h_nyo',
    pronunciation: 'NYO',
    kana: 'にょ',
    type: TypeOfKana.yoon,
    group: 'ny',
  },
  {
    id: 'k_a',
    pronunciation: 'A',
    kana: 'ア',
    type: TypeOfKana.basic,
    group: 'basic',
  },
  {
    id: 'k_da',
    pronunciation: 'DA',
    kana: 'ダ',
    type: TypeOfKana.tenten,
    group: 'd',
  },
  {
    id: 'k_pyo',
    pronunciation: 'PYO',
    kana: 'ポョ',
    type: TypeOfKana.yoon,
    group: 'py',
  },
];

describe('Filter Kana', () => {
  it('should return a filtered array', () => {
    const filter = ['hiragana', 'yoon'];

    const result = filterKana(sampleArray, filter);

    expect(result).toStrictEqual([
      {
        id: 'h_nyo',
        pronunciation: 'NYO',
        kana: 'にょ',
        type: TypeOfKana.yoon,
        group: 'ny',
      },
    ]);
  });

  it('should return the same array if all filter options are passed', () => {
    const filter = ['hiragana', 'katakana', 'basic', 'tenten', 'yoon'];

    const result = filterKana(sampleArray, filter);

    expect(result).toStrictEqual(sampleArray);
  });

  it('should return an empty array if the filter misses the type of kana', () => {
    const filter = ['hiragana'];

    const result = filterKana(sampleArray, filter);

    expect(result).toStrictEqual([]);
  });

  it('should return an empty array if the filter misses the group of kana', () => {
    const filter = ['yoon'];

    const result = filterKana(sampleArray, filter);

    expect(result).toStrictEqual([]);
  });
});
