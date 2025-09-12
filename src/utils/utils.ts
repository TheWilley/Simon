export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function arraysAreEqualSoFar<T>(arr1: T[], arr2: T[]) {
  return JSON.stringify(arr2.slice(0, arr1.length)) === JSON.stringify(arr1);
}

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
