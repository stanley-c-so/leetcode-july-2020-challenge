// --- Day 23: Single Number III ---

// Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.

// Example:

// Input:  [1,2,1,3,2,5]
// Output: [3,5]
// Note:

// The order of the result is not important. So in the above example, [5, 3] is also correct.
// Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?

// ----------

// TO-DO: FIND A CONSTANT SPACE SOLUTION
function solution_1 (nums) {

}

// thomas luo's one-liner - doesn't use constant space
solution_2=(n,s={})=>n.map(e=>s[e]=s[e]?2:1)&&n.filter(e=>s[e]-2)

// my improvement on thomas' one-liner (`f[n]` gets assigned to its reverse boolean value, and we filter by truthy values of `f[n]`)
solution_3=(N,f={})=>N.map(n=>f[n]=!f[n])&&N.filter(n=>f[n])

const singleNumber = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = singleNumber;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [1, 2, 1, 3, 2, 5],
};
expected = [3, 5];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: