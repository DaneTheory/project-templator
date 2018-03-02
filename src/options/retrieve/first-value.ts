export function firstValue(list: any[], test: Function) {
  var result = null;
  list.some((item: any, index: number, arr: any[]) => {
    if (test.call(null, item)) {
      result = item
      return true
    }
    return false
  });
  return result;
}
