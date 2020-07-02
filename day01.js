// --- Day 1: Arranging Coins ---

// You have a total of n coins that you want to form in a staircase shape, where every k-th row must have exactly k coins.

// Given n, find the total number of full staircase rows that can be formed.

// n is a non-negative integer and fits within the range of a 32-bit signed integer.

// Example 1:

// n = 5

// The coins can form the following rows:
// ¤
// ¤ ¤
// ¤ ¤

// Because the 3rd row is incomplete, we return 2.
// Example 2:

// n = 8

// The coins can form the following rows:
// ¤
// ¤ ¤
// ¤ ¤ ¤
// ¤ ¤

// Because the 4th row is incomplete, we return 3.

// ----------

// we could basically iterate to build up the staircase and calculate how many completed rows we have
function solution_1 (n) {
  let total = 0;
  let k = 0;                        // `k` represents the number of steps
  while (total < n) total += ++k;   // increment `k` and increase `total` by `k` until `total` meets or exceeds `n`
  return total === n ? k : k - 1;   // if `total` equals `n` then you have `k` completed steps. otherwise, the final step is incomplete, so return `k - 1`
}

// we can also solve this problem mathematically. since 1 + 2 + ... + k = n (assuming complete steps), we have n = k(k + 1)/2. to express `k` in terms of `n`,
// we can either use quadratic formula to get k = (sqrt(8n + 1) - 1)/2, or completing the square to get sqrt(2n + 1/4) - 1/2, which are mathematically the same.
// however, since `n` may not be perfectly composed of `k` complete rows, we simply floor the above expression.
function solution_2 (n) {
  return Math.floor((Math.sqrt(8 * n + 1) - 1) / 2);
}

// one-liner - basically the above. no need to write 0 in units digit in a decimal. use `|0` as a shortcut for Math.floor
var solution_3=n=>((2*n+1/4)**.5-.5)|0

// thomas luo's one-liner - turns out you don't need to wrap the entire thing in parentheses before doing `|0`. thomas seems to have used the quadratic formula
var solution_4=n=>((1+8*n)**.5-1)/2|0

// alex mok's one-liner - alex used completing the square
var solution_5=n=>(2*n+.25)**.5-.5|0

const arrangeCoins = solution_5;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = arrangeCoins;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: 5,
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  n: 8,
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: