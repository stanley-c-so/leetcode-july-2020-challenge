// --- Day 2: Binary Tree Level Order Traversal II ---

// Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its bottom-up level order traversal as:
// [
//   [15,7],
//   [9,20],
//   [3]
// ]

// ----------

// we can just do regular BFS traversal where we keep track of the `mostRecentLevel`, and when we come up against a node with a different level, we update `mostRecentLevel` and
// push a new subarray into `output`. following that check, what we do in every case is to push `node.val` into the last subarray of `output`, before processing any children.
// since we want the result to be in reverse order, we simply return `output.reverse()`.
function solution_1 (root) {
  if (!root) return [];
  const output = [];
  let mostRecentLevel = 0;
  const queue = [[root, 1]];
  while (queue.length) {
    const [node, depth] = queue.shift();
    if (depth !== mostRecentLevel) {
      mostRecentLevel = depth;
      output.push([]);
    }
    output[output.length - 1].push(node.val);
    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }
  return output.reverse();
}

// same idea as above, but if we are concerned about time complexity with using an array as a queue (too lazy to build a linked list), and we are willing to sacrifice memory,
// we can move along the array without shifting.
function solution_2 (root) {
  if (!root) return [];
  const output = [];
  let mostRecentLevel = 0;
  const queue = [[root, 1]];
  for (let i = 0; i < queue.length; ++i) {                    // switched while loop to for loop that runs while `i` is in bounds (as children are found, we will push into `queue`)
    const [node, depth] = queue[i];                           // instead of shifting, just grab the element at index `i`
    if (depth !== mostRecentLevel) {
      mostRecentLevel = depth;
      output.push([]);
    }
    output[output.length - 1].push(node.val);
    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }
  return output.reverse();
}

// one-liner - basically the above
var solution_3=r=>{o=[];L=0;q=[[r,1]];if(r)while(q.length){[n,d]=q.shift();d!=L?(L=d,o.push([])):0;o[o.length-1].push(n.val);n.left?q.push([n.left,d+1]):0;n.right?q.push([n.right,d+1]):0}return o.reverse()}

// thomas luo's one-liner - notably, thomas does NOT use BFS here. technically, his algorithm is DFS. however, for any given node, he pushes the data into the correct place in the output.
// he uses `e` to store output, and depending on what level `l` a node is on, he first checks if a subarray exists at that index of `e` - if not, he makes an empty one. then, he pushes the
// data into the bucket (subarray) at that index. by always recursing left before recursing right, he ensures that all nodes at a given level will be handled in the correct relative order,
// even if not handled back to back. the main function, then, simply kickstarts the process at the root. ultimately, he reverses the output.
var solution_4=(r,e=[],d=(r,l=0)=>r?(e[l]?1:e[l]=[])&(e[l++].push(r.val))&d(r.left,l)&!d(r.right,l):1)=>d(r)|1&&e.reverse()

// my improvement on thomas' one-liner - shaving a character at the end
var solution_5=(r,e=[],d=(r,l=0)=>r?(e[l]?1:e[l]=[])&(e[l++].push(r.val))&d(r.left,l)&!d(r.right,l):1)=>(d(r),e.reverse())

const levelOrderBottom = solution_5;

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
const func = levelOrderBottom;
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
  [15, 7],
  [9, 20],
  [3],
];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: