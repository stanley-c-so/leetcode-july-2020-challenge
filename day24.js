// --- Day 24: All Paths From Source to Target ---

// Given a directed, acyclic graph of N nodes.  Find all possible paths from node 0 to node N-1, and return them in any order.

// The graph is given as follows:  the nodes are 0, 1, ..., graph.length - 1.  graph[i] is a list of all nodes j for which the edge (i, j) exists.

// Example:
// Input: [[1,2], [3], [3], []] 
// Output: [[0,1,3],[0,2,3]] 

// Explanation: The graph looks like this:
// 0--->1
// |    |
// v    v
// 2--->3
// There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

// Note:

// The number of nodes in the graph will be in the range [2, 15].
// You can print different paths in any order, but you should keep the order of nodes inside one path.

// ----------

// we use a recursive helper function. if input `node` is the target, then we are done. else, we recurse on all neighbors of current `node`, and unshift `node` into each result. kickstart this process
// at node 0.
function solution_1 (graph) {
  const target = graph.length - 1;
  function helper (node) {
    if (node === target) return [[target]];
    const output = [];
    for (const neighbor of graph[node]) {
      for (const path of helper(neighbor)) {
        output.push([node, ...path]);
      }
    }
    return output;
  }
  return helper(0);
}

// one-liner - basically the above
solution_2=(g,t=g.length-1,h=(n,o=[])=>n-t?eval(`for(N of g[n])for(p of h(N))o.push([n,...p]);o`):[[t]])=>h(0)

const allPathsSourceTarget = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = allPathsSourceTarget;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  graph: [
    [1, 2],
    [3],
    [3],
    [],
  ],
};
expected = [
  [0, 1, 3],
  [0, 2, 3],
];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: