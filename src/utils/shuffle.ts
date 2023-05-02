type ArrayTypes = string | number | {} | [] | boolean | undefined;

// Fisher-Yates Shuffle: https://javascript.info/task/shuffle
function shuffle(array: ArrayTypes[]): ArrayTypes[] | undefined {
  if (array.length === 0) {
    return undefined;
  }

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export default shuffle;
