// --- Day 9: Maximum Width of Binary Tree ---

// Given a binary tree, write a function to get the maximum width of the given tree. The width of a tree is the maximum width among all levels. The binary tree has the same structure as a full binary tree, but some nodes are null.

// The width of one level is defined as the length between the end-nodes (the leftmost and right most non-null nodes in the level, where the null nodes between the end-nodes are also counted into the length calculation.

// Example 1:

// Input: 

//            1
//          /   \
//         3     2
//        / \     \  
//       5   3     9 

// Output: 4
// Explanation: The maximum width existing in the third level with the length 4 (5,3,null,9).

// Example 2:

// Input: 

//           1
//          /  
//         3    
//        / \       
//       5   3     

// Output: 2
// Explanation: The maximum width existing in the third level with the length 2 (5,3).

// Example 3:

// Input: 

//           1
//          / \
//         3   2 
//        /        
//       5      

// Output: 2
// Explanation: The maximum width existing in the second level with the length 2 (3,2).

// Example 4:

// Input: 

//           1
//          / \
//         3   2
//        /     \  
//       5       9 
//      /         \
//     6           7
// Output: 8
// Explanation:The maximum width existing in the fourth level with the length 8 (6,null,null,null,null,null,null,7).

// Note: Answer will in the range of 32-bit signed integer.

// ----------

// WILL NOT PASS A LARGE INPUT SPEC ON LEETCODE - i am multiplying `x` by 2 at every level and i believe it overflows. i will keep this solution here for reference and try to solve it in the next solution.
// the idea, however, is to do a DFS traversal of the tree, and to calculate the `x` and `y` of each node. we will also have a `memo` array that holds the max and min `x` values found for each `y` (level)
// so far. after traversing the tree, the `memo` will be complete, and we will simply look for the greatest difference.
function solution_1 (root) {
  if (!root) return 0;                                          // EDGE CASE: empty input
  const memo = [];                                              // each index represents a height (`y`) where root height is 0. value is an object with max/min properties for `x` values
  const stack = [[root, 0, 0]];                                 // root has `x` and `y` of 0 and 0
  while (stack.length) {
    const [node, x, y] = stack.pop();
    if (!memo[y]) memo[y] = {max: -Infinity, min: Infinity};    // every node has the chance to overtake max/min, so the default values of max and min should be -Infinity and Infinity
    memo[y].max = Math.max(memo[y].max, x);
    memo[y].min = Math.min(memo[y].min, x);
    if (node.left) stack.push([node.left, 2*x, y + 1]);         // left children `x` becomes `2*x`
    if (node.right) stack.push([node.right, 2*x + 1, y + 1]);   // right children `x` becomes `2*x + 1`
  }
  let maxWidth = 1;                                             // the root, at minimum, has width of 1
  for (const level of memo) {
    maxWidth = Math.max(maxWidth, level.max - level.min + 1);   // don't forget to add 1 to the difference
  }
  return maxWidth;
}

// based off of alex mok's one-liner - i believe `memo[i]` keeps track of the horizontal offset between the actual leftmost node at level `i` compared to where the leftmost node would be, if the actual
// leftmost node of the previous level indeed had a left child. thus, by recalculating `difference` with each node, we are grabbing relative positions, and we will not run into the integer overflow
// problem.
function solution_2 (root) {
  const memo = [0];
  let max = 0;                                          // default value is 0 in case of null input (in which case `helper` would return immediately)
  function helper (node, level, pos) {                  // recursive DFS helper
    if (!node) return;
    if (level > memo.length - 1) memo.push(pos);        // if this is the leftmost node for the given `level`, there will not be an entry at `memo[level]`, so push in `pos`
    const difference = pos - memo[level];               // thus, `difference` is relative position, always based on the current node's `pos` and the `pos` of the leftmost node at this `level`
    max = Math.max(max, difference + 1);                // don't forget to add 1 to the difference for purposes of finding the max width
    helper(node.left, level + 1, difference*2);         // recurse left (going left should be treated as double the relative position)
    helper(node.right, level + 1, difference*2 + 1);    // recurse right (going right should be treated as double the relative position, plus 1)
  }
  helper(root, 0, 0);                                   // kickstart the recursive DFS helper with `level` and `pos` equal to 0
  return max;
}

// alex mok's one-liner - note that `let d` is required (we cannot have `d` be global or else it will change during the first recursive call of `h` before the second)
var solution_3=(r,a=[m=0],h=(n,l,p)=>{if(!n)return;if(l>a.length-1)a.push(p);let d=p-a[l];m=m>d+1?m:d+1;h(n.left,l+1,d*2);h(n.right,l+1,d*2+1)})=>h(r,0,0)|m

// my improvement on alex mok's one-liner
var solution_4=(r,a=[m=0],h=(n,l,p)=>{if(n){if(l>a.length-1)a.push(p);let d=p-a[l];m=m>d+1?m:d+1;h(n.left,l+1,d*2);h(n.right,l+1,d*2+1)}})=>h(r,0,0)|m

const widthOfBinaryTree = solution_4;

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
const func = widthOfBinaryTree;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(1)
    .insert(3, 2, true)
    .insert(true, 5, 3, null, 9),
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  root: new BinaryTree(1)
    .insert(3, null, true)
    .insert(true, 5, 3, null, null),
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  root: new BinaryTree(1)
    .insert(3, 2, true)
    .insert(true, 5, null, null, null),
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  root: new BinaryTree(1)
    .insert(3, 2, true)
    .insert(false, 5, null, null, 9)
    .insert(true, 6, null, null, null, null, null, null, 7),
};
expected = 8;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 5                                                    // my initial solution will pass this test. however, LC has one large input test (a degenerate tree going down some 1800+ generations
input = {                                                         // following the pattern shown here. my solution will fail that test. i believe it is because i am calculating new `x` values based on
  root: new BinaryTree(0)                                         // `2*x` of the parent, and the integer will overflow after either 2^253 - 1 or 2^231 - 1.
    .insert(null, 0, true)
    .insert(false, ...Array(3).fill(null), 0)
    .insert(false, ...Array(7).fill(null), 0)
    .insert(false, ...Array(15).fill(null), 0)
    .insert(true, ...Array(31).fill(null), 0),
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);