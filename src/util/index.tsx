// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isVaildArray(val: any): boolean {
  if (val && Array.isArray(val)) {
    return true;
  }
  return false;
}

export function keepUniqueArrayValue(arr: Array<any>): Array<any> {
  return [...new Set(arr)];
}

export function sortArray(arr: Array<any>): Array<any> {
  return arr.sort((a, b) => a - b);
}
