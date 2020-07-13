// --- Day 13: Same Tree ---

// Given two binary trees, write a function to check if they are the same or not.

// Two binary trees are considered the same if they are structurally identical and the nodes have the same value.

// Example 1:

// Input:     1         1
//           / \       / \
//          2   3     2   3

//         [1,2,3],   [1,2,3]

// Output: true

// Example 2:

// Input:     1         1
//           /           \
//          2             2

//         [1,2],     [1,null,2]

// Output: false

// Example 3:

// Input:     1         1
//           / \       / \
//          2   1     1   2

//         [1,2,1],   [1,1,2]

// Output: false

// ----------

// if either `p` or `q` is null, we make sure that they are both null. else, they're both trees, so we make sure their values match, and we recurse on their left and right children.
function solution_1 (p, q) {
  return !p || !q ? p === q : (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
}

// one-liner - same as above
var solution_2=(p,q,i=isSameTree)=>!p||!q?p==q:p.val==q.val&&i(p.left,q.left)&&i(p.right,q.right)

// thomas luo's one-liner - same thing, but he uses a recursive helper function
var solution_3=(p,q,d=(a,b)=>!a&&!b?!0:!a|!b||a.val-b.val?!1:d(a.left,b.left)&&d(a.right,b.right))=>d(p,q)

const isSameTree = solution_3;

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
const func = isSameTree;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  p: new BinaryTree(1)
    .insert(2, 3, true)
    .insert(true),
  q: new BinaryTree(1)
  .insert(2, 3, true)
  .insert(true),
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  p: new BinaryTree(1)
    .insert(2, null, true)
    .insert(true),
  q: new BinaryTree(1)
  .insert(null, 2, true)
  .insert(true),
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  p: new BinaryTree(1)
    .insert(2, 1, true)
    .insert(true),
  q: new BinaryTree(1)
  .insert(1, 2, true)
  .insert(true),
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: