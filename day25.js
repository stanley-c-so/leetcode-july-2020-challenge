// --- Day 25: Find Minimum in Rotated Sorted Array II ---

// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).

// Find the minimum element.

// The array may contain duplicates.

// Example 1:

// Input: [1,3,5]
// Output: 1

// Example 2:

// Input: [2,2,2,0,1]
// Output: 0
// Note:

// This is a follow up problem to Find Minimum in Rotated Sorted Array.
// Would allow duplicates affect the run-time complexity? How and why?

// ----------

// the smallest number is always the one that comes immediately after the break. we can repeatedly scan the num at `middle`, `left`, and `right` and compare them against `min`. then we can use binary
// search to eliminate the half that does not contain the break. but what if your middle number is the same as both left and right? then you have no information to eliminate either half because you cannot
// determine whether the break exists in the left half or the right. so you have no choice but to search both. as such, i decided to go with a recursive helper function, and in the event that the above
// situation arises, i just recurse on both halves. don't forget to break the while loop in this case, since `left` and `right` are not moving.)
// NOTE: could we further optimize the logic in the else block?
function solution_1 (nums) {

  let min = Infinity;

  // RECURSIVE HELPER FUNCTION
  function helper (left, right) {
    while (left <= right) {
      const middle = Math.floor((right - left) / 2) + left;
      min = Math.min(min, nums[left], nums[middle], nums[right]);         // scan the numbers at `left`, `middle`, and `right` pointers potentially overtake `min`
      if (nums[left] < nums[middle]) {                                    // there is no break on the left half. the true `min` may be in the right half
        left = middle + 1;
      } else if (nums[middle] < nums[right]) {                            // there is no break on the right half. the true `min` may be in the left half
        right = middle - 1;
      } else {
        helper(left, middle - 1);
        helper(middle + 1, right);
        break;                                                            // don't forget to break the while loop since `left` and `right` are not moving!!!
      }
    }
  }

  helper(0, nums.length - 1);
  return min;
}

// one-liner - simple linear search
solution_2=n=>Math.min(...n)

const findMin = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = findMin;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [1, 3, 5],
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [2, 2, 2, 0, 1],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums: [4, 5, 6, 7, 0, 1, 2],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: