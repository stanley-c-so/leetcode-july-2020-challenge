// --- Day 3: Prison Cells After N Days ---

// There are 8 prison cells in a row, and each cell is either occupied or vacant.

// Each day, whether the cell is occupied or vacant changes according to the following rules:

// If a cell has two adjacent neighbors that are both occupied or both vacant, then the cell becomes occupied.
// Otherwise, it becomes vacant.
// (Note that because the prison is a row, the first and the last cells in the row can't have two adjacent neighbors.)

// We describe the current state of the prison in the following way: cells[i] == 1 if the i-th cell is occupied, else cells[i] == 0.

// Given the initial state of the prison, return the state of the prison after N days (and N such changes described above.)

// Example 1:

// Input: cells = [0,1,0,1,1,0,0,1], N = 7
// Output: [0,0,1,1,0,0,0,0]
// Explanation: 
// The following table summarizes the state of the prison on each day:
// Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
// Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
// Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
// Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
// Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
// Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
// Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
// Day 7: [0, 0, 1, 1, 0, 0, 0, 0]

// Example 2:

// Input: cells = [1,0,0,1,0,0,1,0], N = 1000000000
// Output: [0,0,1,1,1,1,1,0]
 
// Note:

// cells.length == 8
// cells[i] is in {0, 1}
// 1 <= N <= 10^9

// ----------

// the main crux of this problem is how to handle large values of `N` (example 2 has `N === 1000000000` and we don't want to do more simulations than we need). so, we will look for the first time
// that a previous outcome shows up again, and find the difference of the iteration numbers to determine the "period" of repeat. (note that the first pattern to be repeated is not necessarily the
// initial pattern: the fact that an end cell being initially occupied will never again be filled is easy proof that more than one pattern can lead to the same outcome.) once the period of repeat
// is found, we can simply fast forward our iteration count toward the end and finish off our simulation.
function solution_1 (cells, N) {
  const seen = {[cells.join('')]: 0};             // the `seen` object uses serialized patterns as keys, with the corresponding iteration number as values. the initial conditions correspond to 0.
  let foundPeriod = false;
  let period;
  let output;                                     // we will use `cells` to store the previous pattern, and `output` to store the next pattern
  for (let i = 1; i <= N; ++i) {                  // we will run this simulation `N` times (unless we do any skips when we find a repeat)
    output = cells.map((_, i, a) => {             // this section simulates one "step" (the passage of one day)
      return i === 0 || i === cells.length - 1
        ? 0
        : a[i - 1] === a[i + 1] ? 1 : 0;
    });
    cells = output;                               // at the end of the day, reassign `cells` to hold the new pattern
    if (foundPeriod) continue;                    // micro-optimization: if a period has been found, we no longer need to deal with the `seen` object in the code below
    const serial = output.join('');
    if (!(serial in seen)) seen[serial] = i;      // if this is the first time we are seeing `serial`, make a new key-value pair in the `seen` object
    else {
      period = i - seen[serial];                  // else, calculate the `period`
      foundPeriod = true;                         // convert `foundPeriod` to true
      i = N - ((N - i) % period);                 // and force `i` ahead to the final iteration at which we expect to see it repeated
    }
  }
  return output;
}

// thomas luo's one-liner
var solution_2=(c,N,s=[])=>{for(i=0;i<N;i++){j=(c=c.map((e,i)=>c[i-1]==c[i+1]?1:0)).join();if(s.indexOf(j)+1)break;else s.push(j)}return s[(N-1)%s.length].split(',')}

// alex mok's one-liner - when i asked him "why 14? is the period always 14?" he just said thomas told him the 1st and 15th match so he just took his word for it
var solution_3=(c,N)=>{N=N%14||14;while(N--)c=[...c].map((e,i)=>c[i-1]==c[i+1]?1:0);return c}

const prisonAfterNDays = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = prisonAfterNDays;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 2 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  cells: [0, 1, 0, 1, 1, 0, 0, 1],
  N: 7,
};
expected = [0, 0, 1, 1, 0, 0, 0, 0];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  cells: [1, 0, 0, 1, 0, 0, 1, 0],
  N: 1000000000,
};
expected = [0, 0, 1, 1, 1, 1, 1, 0];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: