// --- Day 20: Remove Linked List Elements ---

// Remove all elements from a linked list of integers that have value val.

// Example:

// Input:  1->2->6->3->4->5->6, val = 6
// Output: 1->2->3->4->5

// ----------

// first we use a dummy node (in case the actual head is removable). we use two pointers: `current` and `next`, initialized as `dummy` and `head`, respectively. we run a while true loop to navigate
// the SLL. with every iteration we always connect `current` to `next` (it doesn't matter if `next` ends up being removable - we will reconnect `current` to something else later). we then check if
// `next` is null, in which case we break. otherwise, depending on whether `next.val` is the removable `val` or not, we either reassign `current` to `next` (thus the old `current` has been permanently)
// configured, or leave it alone (we will reconfigure it again later). finally, in all cases, we move `next` to `next.next`. after the loop is over, we simply reutrn `dummy.next` to "get rid" of `dummy`.
function solution_1 (head, val) {
  const dummy = new ListNode(null);           // note: `dummy` will automatically be connected to correct node in the SLL through the logic of the while loop below
  let current = dummy;
  let next = head;
  while (true) {
    current.next = next;                      // always connect `current` to `next` - even if `next` is removable (its .val is `val`), we will fix that in a later iteration
    if (!next) break;                         // eventually, `next` will be null, meaning that we have reached the end, so we break
    if (next.val !== val) current = next;     // if `next` is non-removable (its .val is not `val`) then `current` was properly configured two lines ago, so advance `current` to `next`
    next = next.next;                         // always advance `next` to `next.next`
  }
  return dummy.next;
}

// one-liner - basically the above. note that dummy's .val doesn't matter, so we can substitute it with a regular object with a next property. using `eval` here saves 1 character!
solution_2=(h,v,c=d={next:n=h})=>eval(`while(8){c.next=n;if(!n)break;c=n.val!=v?n:c;n=n.next}d.next`)

const removeElements = solution_2;

// const specialTest = (...args) => {
// };

class ListNode {
  constructor (val, ...extraVals) {
    this.val = val;
    this.next = null;
    if (extraVals.length) this.insert(...extraVals);
  }
  insert (...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new ListNode(val);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
    return this;
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = removeElements;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  head: new ListNode(1, 2, 6, 3, 4, 5, 6),
  val: 6
};
expected = new ListNode(1, 2, 3, 4, 5);
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: