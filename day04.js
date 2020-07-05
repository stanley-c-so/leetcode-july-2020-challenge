// --- Day 4: Ugly Number II ---

// Write a program to find the n-th ugly number.

// Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. 

// Example:

// Input: n = 10
// Output: 12
// Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.

// Note:  
// 1 is typically treated as an ugly number.
// n does not exceed 1690.

// ----------

// the key idea is that every ugly number (other than 1) can be reached by multiplying some lower ugly number by 2, 3, or 5. we can keep three separate array queues, `A`, `B`, `C`. we take the
// current ugly number, `x` (initialized at 1). then we push into `A`: the result of `x * 2`; into `B`: the result of `x * 3`; and into `C`: the result of `x * 5`. to avoid calling .shift on
// the array queues, we will simply track the current number in each queue using corresponding `a`, `b`, and `c` (initialized at 0). comparing the "heads" of each queue, we find the smallest
// number, and make that the next `x`. we repeat this process `n` times. however, some numbers will appear as many as three times (once per queue) - e.g. 30. in fact, the first ugly number to
// be repeated is 6 (`x * 3`, when `x` was 2, and `x * 2`, when `x` was 3). to handle this, we introduce a `skip` boolean (initialized at false). as a micro-optimization, we only push numbers
// to the array queues when `skip` is false. we set `skip` to true only if the current ugly number, `x`, is already equal to the next number to be "shifted" out of the queues. in that case, we
// continue with the queue process for this iteration, but we do not decrement `n`.
function solution_1 (n) {
  const A = [];                                 // this array queue holds values of multiplying the current ugly number by 2
  const B = [];                                 // ditto, for 3
  const C = [];                                 // ditto, for 5
  let a = b = c = 0;                            // to avoid shifting the array queues, we just use these index values to track current "heads"
  let skip = false;                             // this boolean allows to us to skip over a number we have already seen
  let x = 1;                                    // this is the current ugly number
  --n;                                          // since we already have the first ugly number, 1, we can decrement `n` right off the bat
  while (n) {                                   // (since there can be duplicates, we will not say `while (--n)`. we want to control when to decrement `n` and when not to.)
    if (!skip) {                                // micro-optimization: only if have not seen the current `x` before should we push its multiples into the queues. otherwise, we will repeat work
      A.push(x * 2);
      B.push(x * 3);
      C.push(x * 5);
    }
    const min = Math.min(A[a], B[b], C[c]);     // find the lowest of the three "heads"
    skip = x === min;                           // if we have a duplicate, then the current `x` will already equal the lowest "head", so we set `skip` to true. otherwise, false.
    if (A[a] === min) {                         // whichever head is the lowest, `x` becomes that value, and that queue advances
      x = A[a++];
    } else if (B[b] === min) {
      x = B[b++];
    } else {
      x = C[c++];
    }
    if (!skip) --n;                             // to ensure we get the `n`th ugly number, only decrement `n` when we are dealing with non-duplicates
  }
  return x;
}

// one-liner - basically the above
var solution_2=n=>{[A,B,C,s,x]=[[],[],[],!8,1];a=b=c=0;--n;while(n){s?0:(A.push(x*2),B.push(x*3),C.push(x*5));m=Math.min(A[a],B[b],C[c]);s=x==m;x=A[a]==m?A[a++]:B[b]==m?B[b++]:C[c++];s?0:--n}return x}

// alex mok's one-liner - `a` is the array of found ugly numbers; `x` is current ugly number; `p` is an array used to multiply `x` by 2, 3, and 5; `N` is a set of found but not yet processed ugly numbers.
// he initializes `a` with 1, and `N` with 2, 3, and 5. he continually chooses the smallest number within `N`, multiplies it by 2, 3, and 5, and adds those results to the set.
var solution_3=n=>{for(a=[i=1],p=[2,3,5],N=new Set(p);i<n;){if(N.has(x=a[i++]=Math.min(...N)))N.delete(x);p.map(e=>N.add(x*e))}return a[n-1]}

const nthUglyNumber = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = nthUglyNumber;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: 10,
};
expected = 12;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: