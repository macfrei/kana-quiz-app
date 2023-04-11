enum TypeOfKana {
  basic = 'basic',
  tenten = 'tenten',
  yoon = 'yoon',
}

type KanaType = {
  id: string;
  pronunciation: string;
  kana: string;
  type: TypeOfKana;
  group: string;
};

export { TypeOfKana };
export type { KanaType };
