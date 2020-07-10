// --- Day 10: Flatten a Multilevel Doubly Linked List ---

// You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.

// Flatten the list so that all the nodes appear in a single-level, doubly linked list.You are given the head of the first level of the list.

// Example 1:

// Input: head = [1, 2, 3, 4, 5, 6, null, null, null, 7, 8, 9, 10, null, null, 11, 12]
// Output: [1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6]

// Example 2:

// Input: head = [1, 2, null, 3]
// Output: [1, 3, 2]
// Explanation:

// The input multilevel linked list is as follows:

// 1-- - 2-- - NULL
//   |
//   3-- - NULL

// Example 3:

// Input: head = []
// Output: []

// How multilevel linked list is represented in test case:

// We use the multilevel linked list from Example 1 above:

// 1-- - 2-- - 3-- - 4-- - 5-- - 6--NULL
//   |
//   7-- - 8-- - 9-- - 10--NULL
//     |
//     11--12--NULL

// The serialization of each level is as follows:

// [1, 2, 3, 4, 5, 6, null]
// [7, 8, 9, 10, null]
// [11, 12, null]

// To serialize all levels together we will add nulls in each level to signify no node connects to the upper node of the previous level.The serialization becomes:

// [1, 2, 3, 4, 5, 6, null]
// [null, null, 7, 8, 9, 10, null]
// [null, 11, 12, null]

// Merging the serialization of each level and removing trailing nulls we obtain:

// [1, 2, 3, 4, 5, 6, null, null, null, 7, 8, 9, 10, null, null, 11, 12]

// Constraints:

// Number of Nodes will not exceed 1000.
// 1 <= Node.val <= 10 ^ 5

// ----------

// this is the most efficient O(n) solution that i am aware of. the recursive helper function iterates through a list, and returns both the head and the tail of that list. thus, when a child is found,
// we run it through the helper, and we can easily connect the head and tail of the child list to the appropriate nodes in the main list.
function solution_1 (head) {
  const helper = head => {
    // INITIALIZATIONS
    let finalNode;                                                      // final sibling node of the current head, or if that final sibling had any children, the final node at that level
    let currentNode = head;

    // ITERATE THROUGH THE LINKED LIST
    while (currentNode) {
      const originalNext = currentNode.next;                            // save a reference to the next node (or null), in case there is a child at this node
      finalNode = currentNode;
      if (currentNode.child) {                                          // if there is a child at this node...
        const [childHead, childTail] = helper(currentNode.child);       // ...recurse helper on the child to flatten it
        currentNode.child = null;                                         // don't forget to set the .child property to null
        currentNode.next = childHead;                                     // connect current node to childHead
        childHead.prev = currentNode;                                     // connect childHead back to currentNode
        childTail.next = originalNext;                                    // connect childTail to originalNext (THIS IS THE WHOLE POINT OF THE HELPER - don't need to run through children)
        if (originalNext) originalNext.prev = childTail;                  // if originalNext is a node, connect it back to childTail
        finalNode = childTail;                                            // reassign finalNode to childTail in case there is no node after this!
      }
      currentNode = originalNext;                                       // advance currentNode to originalNext
    }
    return [head, finalNode];                                           // at the end of the while loop, return both the head and the finalNode (finalNode helps connect children back up)
  };
  
  return helper(head)[0];
}

// one-liner - not as efficient as above (O(n^2) in the worst case). the main function is recursive - it doesn't use a helper
var solution_2=(h,c=h,n,N='next')=>{while(c){n=c[N];if(C=c.child){c[N]=flatten(C);c.child=null;c[N].prev=c;while(x=c[N])c=x;c[N]=n}n?n.prev=c:0;c=n}return h}

// thomas luo's one-liner - he writes a recursive helper function (`d`) that iterates through a linked list, and dumps nodes in the proper order (recursing on child, if any, before recursing on next)
// into an outer array (`a`). then, having laid out the nodes in the proper order in `a`, he reconfigures the next/prev pointers of the nodes from within the array, generating the flattened list.
var solution_3=(h,a=[],d=r=>r?a.push(r)&d(r.child)&d(r.next):0,z=null)=>d(h)||a.map((e,i)=>{e.prev=a[i-1]||z;e.next=a[i+1]||z;e.child=z})&&h

const flatten = solution_3;

const specialTest = (head, expected) => {                       // specialTest is needed because a doubly linked list has circular references that will break my test suite
  function pushNodesIntoArray (head) {                          // since the output is assumed to be a flat doubly-linked list, our test will navigate the list and push values into an array
    const array = [];
    let node = head;
    while (node) {
      array.push(node);
      node = node.next;
    }
    return array;
  }
  const actualArray = pushNodesIntoArray(flatten(head));
  const expectedArray = pushNodesIntoArray(expected);
  return actualArray.every((node, i, arr) => {                  // for the test to pass, every node in `actualArray` must satisfy the following:
    return node.val === expectedArray[i].val &&                 // its value must match the value of the corresponding node in `expectedArray`
      (i === arr.length - 1 || node.next === arr[i + 1]) &&     // other than the final node, each node's next pointer must be pointing at the next node in the array
      (!i || node.prev === arr[i - 1]) &&                       // other than the first node, each node's prev pointer must be pointing at the previous node in the array
      node.child === null                                       // each node's child pointer must be set to null
  });
};

// modified ListNode class for this problem
class ListNode {
  constructor (val, ...extraVals) {
    this.val = val;
    this.next = null;
    this.prev = null;
    if (extraVals.length) this.insert(...extraVals);
    this.child = null;                                // needed for this problem
  }
  insert (...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new ListNode(val);
      currentNode.next = nextNode;
      nextNode.prev = currentNode;
      currentNode = nextNode;
    }
    return this;
  }
  insertChildAt (k, child) {                          // needed for this problem
    let currentNode = this;
    while (k !== 1) {
      currentNode = currentNode.next;
      k--;
    }
    currentNode.child = child;
    return this;
  }
}

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
  head: new ListNode(1, 2, 3, 4, 5, 6)
    .insertChildAt(3,
      new ListNode(7, 8, 9, 10)
        .insertChildAt(2,
          new ListNode(11, 12)
        )
    ),
  expected: new ListNode(1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6),
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  head: new ListNode(1, 2)
    .insertChildAt(1,
      new ListNode(3)
    ),
  expected: new ListNode(1, 3, 2),
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: