// --- Day 16: Pow(x, n) ---

// Implement pow(x, n), which calculates x raised to the power n (xn).

// Example 1:

// Input: 2.00000, 10
// Output: 1024.00000

// Example 2:

// Input: 2.10000, 3
// Output: 9.26100

// Example 3:

// Input: 2.00000, -2
// Output: 0.25000
// Explanation: 2-2 = 1/22 = 1/4 = 0.25

// Note:

// -100.0 < x < 100.0
// n is a 32-bit signed integer, within the range [−231, 231 − 1]

// ----------

// it goes against the spirit of this problem, but we could just use Math.pow
function solution_1 (x, n) {
  return Math.pow(x, n);
}

// one-liner - alternatively, we can use ** operator
solution_2=(x,n)=>x**n

const myPow = solution_2;

const specialTest = (x, n, expected) => {             // without this, test 2 fails because it's off by 0.000000000000001
  return Math.abs(myPow(x, n) - expected) < 0.000001;
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = specialTest;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  x: 2.00000,
  n: 10,
  expected: 1024.00000,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  x: 2.10000,
  n: 3,
  expected: 9.26100,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  x: 2.00000,
  n: -2,
  expected: 0.25,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: