// --- Day 28: Task Scheduler ---

// You are given a char array representing tasks CPU need to do. It contains capital letters A to Z where each letter represents a different task. Tasks could be done without the original order of the array. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

// However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

// You need to return the least number of units of times that the CPU will take to finish all the given tasks.

// Example 1:

// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation: 
// A -> B -> idle -> A -> B -> idle -> A -> B
// There is at least 2 units of time between any two same tasks.

// Example 2:

// Input: tasks = ["A","A","A","B","B","B"], n = 0
// Output: 6
// Explanation: On this case any permutation of size 6 would work since n = 0.
// ["A","A","A","B","B","B"]
// ["A","B","A","B","A","B"]
// ["B","B","B","A","A","A"]
// ...
// And so on.

// Example 3:

// Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
// Output: 16
// Explanation: 
// One possible solution is
// A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

// Constraints:

// The number of tasks is in the range [1, 10000].
// The integer n is in the range [0, 100].

// ----------

// we first count the frequency of each task, and sort. (we can assume all tasks are represented by unique capital letters and so at most there will be 26 unique tasks - we can use a length 26 array to
// represent the frequencies.) consider the set of those tasks that are tied for the highest frequency. let's say their frequency is `x`. if we do these back to back, `x` times, and the number of time
// units in between identical tasks is equal to `n`, then it is guaranteed that all remaining tasks of lower frequency can fit inside and fill those gaps. if there is any leftover unused space, those
// gaps are idle time. on the other hand, if we have too many other tasks with lower frequency that won't fit inside the gaps, then we simply add those to the end. thus, the answer is whichever is the
// higher of the following: (1) `x - 1` (counting all but one set of the most frequent tasks) multiplied by `n + 1` (the length of each segment is equal to the gap, `n`, plus one fencepost) plus
// `25 - i`, where `i` is one less than the leftmost index of the element equal to the highest frequency, which basically represents the number of such elements that are tied for the most frequent; and
// (2) simply `tasks.length`, which is time it takes to do all the tasks, assuming there is no idle time.
function solution_1 (tasks, n) {

  // STEP 1: CREATE A SORTED FREQUENCY ARRAY (length 26) OF THE TASKS (letters) - NOTE: we only care about the frequencies, not the letters
  const freq = tasks
    .reduce((arr, task) => {
      ++arr[task.charCodeAt(0) - 'A'.charCodeAt(0)];    // 'A' --> 0, 'B' --> 1, ... , 'Z' --> 25
      return arr;
    }, Array(26).fill(0))                               // unused letters must store 0
    .sort((a, b) => a - b);                             // sort in increasing order

  let i = 25;
  while (i >= 0 && freq[i] === freq[25]) --i;           // find the index 1 below the leftmost position that is equal to the highest frequency (can be -1 if all 26 letters have equal frequency)

  return Math.max(
    (freq[25] - 1) * (n + 1) + (25 - i),                // if highest freq is `x`, then there are `x - 1` segments that are each `n + 1` in length (counting fence + 1 post), plus # of posts w/ max freq
    tasks.length,                                       // even if there is no idle time, the lowest possible result is equal to `tasks.length`
  );
}

// one-liner - basically the above - uses `z` as a "constant" for 25
solution_2=(T,n,a=Array(26).fill(0),i=z=25,c='charCodeAt')=>eval(`T.map(t=>++a[t[c](0)-'A'[c](0)]);a.sort((A,B)=>A-B);while(i>=0&&a[i]==a[z])--i;Math.max((a[z]-1)*(n+1)+z-i,T.length)`)

// alex mok's one-liner
solution_3=(t,n,T=t.length,h=Array(26).fill(0))=>eval(`for(c of t)h[c.charCodeAt()-65]+=1;h.sort((a,b)=>b-a);z=h[i=0]-1;r=z*n;while(h[++i],i<26)r-=h[i]<z?h[i]:z;r>0?r+T:T`)

const leastInterval = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = leastInterval;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
  n: 2,
};
expected = 8;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
  n: 0,
};
expected = 6;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  tasks: ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
  n: 2,
};
expected = 16;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: