import { Kana } from '../types/kana';

export default function filterKana(kana: Kana[], kanaChoice: string[]): Kana[] {
  const filteredKanaGroup = kana.filter(el => {
    if (kanaChoice.includes('katakana') && kanaChoice.includes('hiragana')) {
      return el;
    }

    if (kanaChoice.includes('katakana')) {
      return el.id.startsWith('k');
    }

    if (kanaChoice.includes('hiragana')) {
      return el.id.startsWith('h');
    }
  });

  const filteredKana = filteredKanaGroup.filter(el =>
    kanaChoice.includes(el.type)
  );

  return filteredKana;
}
