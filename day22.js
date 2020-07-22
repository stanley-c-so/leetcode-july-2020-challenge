// --- Day 22: Binary Tree Zigzag Level Order Traversal ---

// Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its zigzag level order traversal as:
// [
//   [3],
//   [20,9],
//   [15,7]
// ]

// ----------

// first, we do a regular BFS, organizing the node values in the `output` array by their height (each element of the `output` array is a subarray with all node values at a height equal to the index).
// then, when returning, we map `output` such that for every other index value, we reverse the row.
function solution_1 (root) {
  const output = [];
  if (!root) return output;
  const queue = [[root, 0]];
  while (queue.length) {
    const [node, h] = queue.shift();
    if (!output[h]) output[h] = [];
    output[h].push(node.val);
    if (node.left) queue.push([node.left, h + 1]);
    if (node.right) queue.push([node.right, h + 1]);
  }
  return output.map((row, i) => i % 2 ? row.reverse() : row);
}

// one-liner - basically the above
solution_2=r=>r?eval(`o=[];q=[[r,0]];while(q.length){[n,h]=q.shift();o[h]?0:o[h]=[];o[h].push(n.val);n.left?q.push([n.left,h+1]):0;n.right?q.push([n.right,h+1]):0};o.map((r,i)=>i%2?r.reverse():r)`):[]

const zigzagLevelOrder = solution_2;

// const specialTest = (...args) => {
// };

// NOTE: I developed the following BinaryTree and Batch classes for easy creation of binary trees with arbitrary values.

class BinaryTree {
  constructor (val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  insert (left, right, firstInsert = false) {
    if (left !== null) this.left = new BinaryTree(left);
    if (right !== null) this.right = new BinaryTree(right);
    return firstInsert ? new Batch(this, [this.left, this.right]) : [this.left, this.right];
  }
}

class Batch {
  constructor (root, nodes) {
    this.root = root;
    this.batch = nodes;
  }
  insert (lastInsert, ...values) {
    const nextBatch = [];
    for (let i = 0; i < this.batch.length; i++) {
      if (this.batch[i] !== null) {
        nextBatch.push(...(this.batch[i].insert(
          values[2 * i] === undefined ? null : values[2 * i],
          values[2 * i + 1] === undefined ? null : values[2 * i + 1],
        )));
      } else {
        nextBatch.push(null, null);
      }
    }
    return lastInsert ? this.root : new Batch (this.root, nextBatch);
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = zigzagLevelOrder;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(3)
    .insert(9, 20, true)
    .insert(true, null, null, 15, 7),
};
expected = [
  [3],
  [20, 9],
  [15, 7],
];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: