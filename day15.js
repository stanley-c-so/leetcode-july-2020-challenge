// --- Day 15: Reverse Words in a String ---

// Given an input string, reverse the string word by word.

// Example 1:

// Input: "the sky is blue"
// Output: "blue is sky the"
// Example 2:

// Input: "  hello world!  "
// Output: "world! hello"
// Explanation: Your reversed string should not contain leading or trailing spaces.
// Example 3:

// Input: "a good   example"
// Output: "example good a"
// Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
 

// Note:

// A word is defined as a sequence of non-space characters.
// Input string may contain leading or trailing spaces. However, your reversed string should not contain leading or trailing spaces.
// You need to reduce multiple spaces between two words to a single space in the reversed string.
 

// Follow up:

// For C programmers, try to solve it in-place in O(1) extra space.

// ----------

// all we have to do is split on spaces, reverse, and join on spaces. in between, filter out empty string elements of the array after splitting, which will sanitize instances of extra spaces back to back.
function solution_1 (s) {
  return s
    .split(' ')
    .filter(word => word)     // e.g. ' abc  def '.split(' ') --> ['', 'abc', '', 'def', ''], so filter gets rid of the empty strings
    .reverse()
    .join(' ');
}

// one-liner - basically the above
solution_2=s=>s.split` `.filter(w=>w).reverse().join` `

// thomas luo's one-liner - using regex
solution_3=s=>s.trim().split(/\s+/).reverse().join` `

const reverseWords = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = reverseWords;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  s: 'the sky is blue',
};
expected = 'blue is sky the';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  s: '  hello world!  ',
};
expected = 'world! hello';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  s: 'a good   example',
};
expected = 'example good a';
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: