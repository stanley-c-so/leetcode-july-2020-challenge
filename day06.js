// --- Day 6: Plus One ---

// Given a non-empty array of digits representing a non-negative integer, plus one to the integer.

// The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.

// You may assume the integer does not contain any leading zero, except the number 0 itself.

// Example 1:

// Input: [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents the integer 123.

// Example 2:

// Input: [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents the integer 4321.

// ----------

// starting from the right end, find the first digit that is NOT 9. (if you go out of bounds, then all digits are 9, so return an array of 1 followed by all 0s.) when the non-9 digit is found, increment it,
// and then for every subsequent digit (going right), set those digits to 0.
function solution_1 (digits) {
  let i = digits.length - 1;
  while (i >= 0 && digits[i] === 9) --i;
  if (i < 0) return [1, ...digits.map(e => 0)];
  ++digits[i];
  for (let j = i + 1; j < digits.length; ++j) digits[j] = 0;
  return digits;
}

// one-liner (DOESN'T WORK FOR LARGE INPUTS) - join the input into a string, convert to number, add 1, convert back to string, split into component digits, and convert each digit to a number
var solution_2=d=>String(+d.join``+1).split``.map(d=>+d)

// one-liner - basically solution 1 (i am also allowing `d[i]` to go out of bounds in the while condition for the sake of cutting characters)
var solution_3=d=>{l=d.length;i=l-1;while(d[i]==9)--i;if(i>=0){++d[i];for(j=i+1;j<l;++j)d[j]=0}return i<0?[1,...d.map(e=>0)]:d}

// one-liner - same as above, but using .slice to grab the array up to the point of difference, and concatenating with all 0s after that point
var solution_4=d=>{l=d.length;i=l-1;while(d[i]==9)--i;x=i>=0?++d[i]&&d.slice(0,i+1):[1];return [...x,...Array(l-i-1).fill(0)]}

// one-liner - similar to the idea above, but now we keep popping off the last digit as long as it's 9, keeping count of how many pops we make (`x`). then we increment the last digit (or, if empty
// array, replace it altogether with `[1]`) and then we push 0 in `x` times
var solution_5=d=>{x=0;while(d[d.length-1]==9){d.pop();++x}d[0]?++d[d.length-1]:d=[1];while(x--)d.push(0);return d}

// thomas luo's one-liner - he writes a recursive function that initially takes an input that is actually 1 greater than the corresponding index (hence the main function kickstarts it with `a.length`
// for the final character), and then in every case except where `i` is 0, it simultaneously increments the digit and then checks whether the number at that index is 10 (meaning that it was originally
// 9). if it was originally 9, it gets reassigned to 0, and the helper recurses on the next digit over; else, it returns the array as is (now that the digit has been incremented). if, while recursing,
// `i` ever reaches 0, then the entire input was all 9s, and we simply tack on a 1 at the left end. whatever results when the recursive function stops running also gets returned by the main function.
var solution_6=(a,r=i=>i?++a[--i]-10?a:(a[i]=0)||r(i):a.unshift(1)&&a)=>r(a.length)

// my improvement on thomas' one-liner - switched from `++a[--i]-10` to `a[--i]++-9`; from `(a[i]=0)||r(i)` to `(a[i]=0,r(i))`; from `a.unshift(1)&&a` to `[1,...a]`
var solution_7=(a,r=i=>i?a[--i]++-9?a:(a[i]=0,r(i)):[1,...a])=>r(a.length)

const plusOne = solution_7;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = plusOne;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  digits: [1, 2, 3],
};
expected = [1, 2, 4];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  digits: [4, 3, 2, 1],
};
expected = [4, 3, 2, 2];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 3
input = {
  digits: [9, 9, 9],            // this is my custom test case
};
expected = [1, 0, 0, 0];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  digits: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3],
};
expected = [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  digits: [7,2,8,5,0,9,1,2,9,5,3,6,6,7,3,2,8,4,3,7,9,5,7,7,4,7,4,9,4,7,0,1,1,1,7,4,0,0,6],
};
expected = [7,2,8,5,0,9,1,2,9,5,3,6,6,7,3,2,8,4,3,7,9,5,7,7,4,7,4,9,4,7,0,1,1,1,7,4,0,0,7];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  digits: [5,2,2,6,5,7,1,9,0,3,8,6,8,6,5,2,1,8,7,9,8,3,8,4,7,2,5,8,9],
};
expected = [5,2,2,6,5,7,1,9,0,3,8,6,8,6,5,2,1,8,7,9,8,3,8,4,7,2,5,9,0];
test(func, input, expected, testNum, lowestTest, highestTest);