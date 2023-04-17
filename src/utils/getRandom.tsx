type ArrayTypes = string | number | {} | [] | boolean | undefined;

function getRandomArrayElement(array: ArrayTypes[]): ArrayTypes {
  if (array.length === 0) {
    return undefined;
  }

  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function getRandomArrayElements(
  array: ArrayTypes[],
  numberOfElements: number
): ArrayTypes[] {
  if (numberOfElements >= array.length) {
    return array;
  }

  const copy = [...array];
  const elements: ArrayTypes[] = [];

  for (let i = 0; i < numberOfElements; i++) {
    const index = Math.floor(Math.random() * copy.length);
    const element = copy.splice(index, 1)[0];
    elements.push(element);
  }

  return elements;
}

export { getRandomArrayElement, getRandomArrayElements };
