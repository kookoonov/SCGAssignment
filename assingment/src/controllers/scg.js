let result = [];
export function findValue(len) {
  result = [];
  let current = 3;
  result.push(current);
  
  for (let i = 1; i < len; i++) {
    current += i * 2
    result.push(current);
  }
  // console.log('result ------------->>', result);
  return result;
}