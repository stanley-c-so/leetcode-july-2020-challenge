// --- Day 17: Top K Frequent Elements ---

// Given a non-empty array of integers, return the k most frequent elements.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

// Example 2:

// Input: nums = [1], k = 1
// Output: [1]
// Note:

// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
// It's guaranteed that the answer is unique, in other words the set of the top k frequent elements is unique.
// You can return the answer in any order.

// ----------

// we count the frequency of each num, then sort by putting it into `freqArr` where each index holds a subarray containing all nums that appear `i` times.
// once we have `freqArr` populated, we set `pointer` to be pointing at the highest indexed bucket. while `pointer` continues to point to a non-empty
// bucket, we can pop from the subarray and push to our `output`. do this `k` times. note that some index values will not have any buckets - our logic
// would have `pointer` skip over these values.
function solution_1 (nums, k) {

  // STEP 1: populate `freq` object
  const freq = {};
  for (const num of nums) freq[num] = freq[num] + 1 || 1;

  // STEP 2: populate `freqArr`
  const freqArr = [null];
  for (const num in freq) {
    if (!freqArr[freq[num]]) freqArr[freq[num]] = [];
    freqArr[freq[num]].push(+num);
  }

  // STEP 3: generate `output`
  const output = [];
  let pointer = freqArr.length - 1;
  while (k--) {
    output.push(freqArr[pointer].pop());
    while (pointer && (!freqArr[pointer] || !freqArr[pointer].length)) --pointer;   // move `pointer` if it points to a non-bucket or an empty bucket
  }

  return output;
}

// thomas luo's one-liner - he does a frequency count, then he sorts Object.entries by frequency, maps by the number itself, and grabs a k-length slice
// NOTE: works on LC, but not in node, unless you coerce strings from the object keys back into numbers
solution_2=(n,k,f={})=>n.map(e=>f[e]=f[e]?f[e]+1:1)&&Object.entries(f).sort((a,b)=>b[1]-a[1]).map(e=>e[0]).slice(0,k)

// my improvement on thomas' one-liner - cutting out a few characters in the frequency count (also fixed the type problem above). also, i swapped the order of .slice and .map
solution_3=(n,k,f={})=>n.map(e=>f[e]=f[e]+1||1)&&Object.entries(f).sort((a,b)=>b[1]-a[1]).slice(0,k).map(e=>+e[0])

const topKFrequent = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = topKFrequent;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [1, 1, 1, 2, 2, 3],
  k: 2,
};
expected = [1, 2];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [1],
  k: 1,
};
expected = [1];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: