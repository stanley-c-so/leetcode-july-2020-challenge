// --- Day 11: Subsets ---

// Given a set of distinct integers, nums, return all possible subsets (the power set).

// Note: The solution set must not contain duplicate subsets.

// Example:

// Input: nums = [1,2,3]
// Output:
// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]

// ----------

// the idea is to build up the solution one at a time. since order does not matter (both within the subarrays, as well as the order of the subarrays), we can recurse our function on `nums.slice(1)` and
// then work in `nums[0]` into our solution. how does recursion work? the base case, when the input is empty, is `[[]]` (i.e. an array containing the only possible subset, which is an empty array). for
// all recursive cases, then, we look at the previous solution, "double" it (inside a greater array, spread two copies of the previous solution), and then in half the array, we push the current number
// into each subarray.
function solution_1 (nums) {
  if (!nums.length) return [[]];
  const prevSolution = subsets(nums.slice(1));
  const double = [
    ...prevSolution.map(subarray => subarray.slice()),          // careful not to shallow copy these subarrays! we need deep copies. we accomplish this by throwing .slice into the callback of a .map
    ...prevSolution.map(subarray => subarray.slice()),
  ];
  for (let i = double.length / 2; i < double.length; ++i) {     // push the latest num into the second half of `double`
    double[i].push(nums[0]);
  }
  return double;
}

// this was the fastest JS solution on leetcode at the time of initial submission (i retweaked it). it's difficult to describe how the recursion process works. basically, each time `backtrack` is called,
// we input an `index` and a `curr` which represents a subarray to be pushed into `output`. after the push, a for loop starts with `i` initialized to whatever `index` was, and always stops before
// `nums.length`. `backtrack` is called again with an incremented index (`i + 1`), and with `nums[i]` pre-pushed into `curr`. i drew out a diagram for the stack frames of `backtrack` for the simple example
// of `nums` = [1, 2, 3]. each line is written in terms of (index, curr). time flows from top to bottom. the more indented the line, the higher the stack frame at that time.

// (0, [])                  output: [[]]
//   (1, [1])                       [[], [1]]
//     (2, [1, 2])                  [[], [1], [1, 2]]
//       (3, [1, 2, 3])             [[], [1], [1, 2], [1, 2, 3]]
//     (3, [1, 3])                  [[], [1], [1, 2], [1, 2, 3], [1, 3]]
//   (2, [2])                       [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]]
//     (3, [2, 3])                  [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]]
//   (3, [3])                       [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]

function solution_2 (nums) {
	const output = [];
	function backtrack (index, curr) {
		output.push(curr);
		for (let i = index; i < nums.length; ++i) {
			backtrack(i + 1, [...curr, nums[i]]);
		}
	}
  backtrack(0, []);
	return output;
}

// one-liner of my solution_1
var solution_3=n=>n.length?(s='slice',p=subsets(n[s](1)),d=[...p.map(a=>a[s]()),...p.map(a=>a[s]())],d.map((a,i)=>i>=d.length/2?a.push(n[0]):0),d):[[]]

// one-liner of solution_2
var solution_4=N=>(o=[],b=(I,c)=>(o.push(c),N.map((n,i)=>i>=I?b(i+1,[...c,n]):0)),b(0,[]),o)

// joke solution
  function     solution_5(N,s='s'   +'lice',l='leng'   +'th',S=subsets)     {
if(            !(N[        0]+         Infinity            ))return         [[]]
let            p=          S(N.         slice               (1))             ;
let            d           =[           ...p                .map             (
xx    =>xx     [           s]            ())                ,...             p.
map       (x    =>         x[            s]                  ())             ,
];       for   (let       i=d            [l]                / 2;             i
<d       [l];  ++i         ){            d[i].               push            (
  N[0]);}      return d;'rb.gy'         +'/an'             +'fcea'          ;};

const subsets = solution_5;

const specialTest = nums => {
  return subsets(nums).map(subarray => subarray.sort((a, b) => a - b));     // sort the subarrays within the answer
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
  nums: [1, 2, 3],
};
expected = [
  [3],
  [1],
  [2],
  [1, 2, 3],
  [1, 3],
  [2, 3],
  [1, 2],
  [],
].sort();
test(sortedFunc, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: