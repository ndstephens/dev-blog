export const capitalizeFirstLetter = <T extends string>([
  firstLetter,
  ...restOfWord
]: T) => {
  return (firstLetter.toUpperCase() + restOfWord.join('')) as Capitalize<T>;
};
