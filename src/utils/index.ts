export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export { getDevs } from "./devsInfo";
