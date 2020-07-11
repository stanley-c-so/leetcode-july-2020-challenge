// --- Day 8: 3Sum ---

// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

// Note:

// The solution set must not contain duplicate triplets.

// Example:

// Given array nums = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// ----------

// it is inevitable that 3sum will have O(n^2) time complexity, so the most straightforward way to approach this problem is to first sort the input data (O(n log n) time) to make the rest of the solution
// much easier. for one thing, we can now use the sorted 2sum algorithm, and for another, it helps us to avoid duplicate solutions. after we sort the data, we run a for loop through every possible first
// number. given a particular first number, we run the 2sum algorithm on the remaining numbers to the right. note the two places in which we avoid repeats: (1) at the top of the for loop, we skip repeats
// of the first number; (2) whenever a solution is found in the 2sum algorithm, we set anchors and move `left` and `right` pointers inward in case we have any repeats there.
function solution_1 (nums) {
  const output = [];
  nums.sort((a,b) => a - b);                                                                // allows for sorted 2sum algorithm. since time complexity will be O(n^2), an O(n log n) sort is justified
  for (let i = 0; i < nums.length - 2; ++i) {                                               // iterate through all possible first numbers, and run sorted 2sum algorithm
    if (i && nums[i] === nums[i - 1]) continue;                                             // skip repeats (only works because we sorted the nums!)
    let left = i + 1;                                                                       // the remaining two nums will be marked by `left` and `right`. start these at the ends of the remaining segment
    let right = nums.length - 1;
    const target = -nums[i];                                                                // since a + b + c = 0, the target for b + c is -a
    while (left < right) {                                                                  // note: `left` and `right` cannot overlap
      if (nums[left] + nums[right] < target) {
        ++left;
      } else if (nums[left] + nums[right] > target) {
        --right;
      } else {
        output.push([nums[i], nums[left], nums[right]]);                                    // add found solution to `output`
        const leftAnchor = nums[left];                                                      // the next portion prevents duplicate solutions. save reference "anchors"...
        const rightAnchor = nums[right];
        while (left < right && nums[left] === leftAnchor && nums[right] === rightAnchor) {  // ...and if BOTH `left` and `right` are equal to their respective anchors, move both pointers inward
          ++left;
          --right;
        }
      }
    }
  }
  return output;
}

// one-liner - basically the above
var solution_2=n=>{o=[];x=n.length;n.sort((a,b)=>a-b);for(i=0;i<x-2;++i){c=n[i];if(!i||c!=n[i-1]){l=i+1;r=x-1;t=-c;while(l<r){S=n[l]+n[r];if(S<t)++l;else if(S>t)--r;else{L=n[l];R=n[r];o.push([c,L,R]);while(l<r&&n[l]==L&&n[r]==R){++l;--r}}}}}return o}

const threeSum = solution_2;

const specialTest = nums => {
  return threeSum(nums).map(subarray => subarray.sort((a, b) => a - b));        // sort the subarrays within the answer
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
  nums: [-1, 0, 1, 2, -1, -4],
};
expected = [
  [-1, 0, 1],
  [-1, -1, 2],
].sort();                                                               // run .sort() on the answer itself
test(sortedFunc, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: