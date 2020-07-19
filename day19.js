// --- Day 19: Add Binary ---

// Given two binary strings, return their sum (also a binary string).

// The input strings are both non-empty and contains only characters 1 or 0.

// Example 1:

// Input: a = "11", b = "1"
// Output: "100"

// Example 2:

// Input: a = "1010", b = "1011"
// Output: "10101"
 

// Constraints:

// Each string consists only of '0' or '1' characters.
// 1 <= a.length, b.length <= 10^4
// Each string is either "0" or doesn't contain any leading zero.

// ----------

function solution_1 (a, b) {
  if (a === '0') return b;                        // MICRO-OPTIMIZATION: if either input is '0', return the other
  if (b === '0') return a;
  [a, b] = a.length > b.length                    // pad the shorter input with 0s at the beginning, if necessary, so both inputs have the same length
    ? [a, b.padStart(a.length, '0')]
    : [a.padStart(b.length, '0'), b];
  const output = Array(a.length);                 // set up output array of equal length to the input strings
  let carry = false;                              // `carry` represents whether a 1 is being carried while adding from right to left. by default, false
  for (let i = a.length - 1; i >= 0; --i) {
    const sum = +a[i] + +b[i] + +carry;
    carry = sum > 1;                              // if `sum` is 2 or 3, `carry` should be true. otherwise, if `sum` is 0 or 1, `output[i]` should be false
    output[i] = sum % 2;                          // if `sum` is 0 or 2, `output[i]` should be 0. otherwise, if `sum` is 1 or 3, `output[i]` should be 1
  }
  return (carry ? '1' : '') + output.join('');    // at the very end, if `carry` is true, we need to add an extra 1 to the beginning
}

// one-liner - basically the above
solution_2=(a,b,o=[],c=!8,l='length',p='padStart')=>eval("[a,b]=a[l]>b[l]?[a,b[p](a[l],0)]:[a[p](b[l],0),b];for(i=a[l]-1;i>=0;--i){s=+a[i]+ +b[i]+ +c;c=s>1;o[i]=s%2};(c?1:'')+o.join``")

const addBinary = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = addBinary;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  a: '11',
  b: '1'
};
expected = '100';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  a: '1010',
  b: '1011',
};
expected = '10101';
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: