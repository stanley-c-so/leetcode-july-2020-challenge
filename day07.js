// --- Day 7: Island Perimeter ---

// You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water.

// Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

// The island doesn't have "lakes" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

// Example:

// Input:
// [[0,1,0,0],
//  [1,1,1,0],
//  [0,1,0,0],
//  [1,1,0,0]]

// Output: 16

// Explanation: The perimeter is the 16 yellow stripes in the image below:

// ----------

function solution_1 (grid) {

  // INITIALIZATIONS
  const h = grid.length;
  if (!h) return 0;                                 // UNNECESSARY EDGE CASE HANDLING: empty input - however, leetcode promises exactly one island, so no test case should be empty
  const w = grid[0].length;
  let perimeter = 0;                                // tracker variable

  // RECURSIVE HELPER
  function count (row, col) {
    if (                                            // a shore is found wherever you transition from land to water (going out of bounds also represents land to water)
      row < 0 || row === h ||
      col < 0 || col === w ||
      grid[row][col] === 0
    ) return ++perimeter;                           // we actually don't need to return anything, but i wanted to combine `++count` and `return` to break
    if (grid[row][col] === 1) {                     // (it will not trigger for already visited squares)
      grid[row][col] = 2;                           // we will use 2 to mark the square as visited (it can be anything other than 0 or 1)
      count(row + 1, col);
      count(row - 1, col);
      count(row, col + 1);
      count(row, col - 1);
    }
  }

  // MAIN FUNCTION: FIND THE SINGLE ISLAND AND COUNT
  for (let row = 0; row < h; ++row) {
    for (let col = 0; col < w; ++col) {
      if (grid[row][col]) {
        count(row, col);
        return perimeter;                           // micro-optimization: no need to continue traversal since we are told there is only one island
      }
    }
  }

  return 0;                                         // UNNECESSARY EDGE CASE HANDLING: if there is no island, result should be 0. however, leetcode promises exactly one island
}

// one-liner - basically the above. a few tricks though: (1) i declare `p` (saves 2) and `r` (saves 1) while declaring `w`; (2) in the helper, if `g[r][c]` is not 0, i always increment it (so a given square
// could reach as high as 4, but it doesn't matter because all i care about is checking whether it is equal to 1 to see if it is unvisited); (3) instead of directly checking for equality with 1, i subtract
// 1 and see if it's falsey
var solution_2=g=>{h=g.length;w=g[p=r=0].length;C=(r,c)=>(r<0||r==h||c<0||c==w||!g[r][c])?++p:g[r][c]++-1?0:(C(r+1,c),C(r-1,c),C(r,c+1),C(r,c-1));for(;r<h;++r)for(c=0;c<w;++c)g[r][c]?C(r,c):0;return p}

const islandPerimeter = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = islandPerimeter;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  grid: [
    [0,1,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [1,1,0,0],
  ],
};
expected = 16;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: