// --- Day 26: Add Digits ---

// Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

// Example:

// Input: 38
// Output: 2 
// Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2. 
//              Since 2 has only one digit, return it.
// Follow up:
// Could you do it without any loop/recursion in O(1) runtime?

// ----------

// the only possible digital roots are 1 through 9 (except if `num` is 0, in which case the digital root is 0). notice that as you increase the number, the digital root also increases (except 9 wraps
// back around to 1). therefore, all we have to do is find `num % 9`. of course, any non-zero number that is divisible by 9 will have a digital root of 9 even though `num % 9` would yield 0, so we
// just need to return 9 instead of 0 in that case.
function solution_1 (num) {
  if (!num || n % 9) return n % 9;      // `num` is 0 or `num` is NOT divisible by 9 --> n % 9
  return 9;                             // `num` is NOT 0 and IS divisible by --> 9
}

// one-liner - basically the above
solution_2=n=>!n|n%9?n%9:9

const addDigits = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = addDigits;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  num: 38,
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 2
input = {
  num: 0,
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);
