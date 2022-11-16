export const capitalizeFirstLetter = ([firstLetter, ...restOfWord]: string) =>
  firstLetter.toUpperCase() + restOfWord.join('');
