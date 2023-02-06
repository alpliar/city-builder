import { MathUtils } from "three";

export const getRandomItemFromArray = <T>(items: Array<T>): T => {
  return items[MathUtils.randInt(0, items.length - 1)];
};
