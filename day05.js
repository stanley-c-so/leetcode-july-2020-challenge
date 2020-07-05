// --- Day 5: Hamming Distance ---

// The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

// Given two integers x and y, calculate the Hamming distance.

// Note:
// 0 ≤ x, y < 231.

// Example:

// Input: x = 1, y = 4

// Output: 2

// Explanation:
// 1   (0 0 0 1)
// 4   (0 1 0 0)
//        ↑   ↑

// The above arrows point to positions where the corresponding bits are different.

// ----------

// convert both `x` and `y` to binary form, and then if one is shorter than the other, fill it with 0s on its left side. then go character by character, finding the number of differences.
function solution_1 (x, y) {
  x = x.toString(2);
  y = y.toString(2);
  let [big, small] = x.length > y.length ? [x, y] : [y, x];
  small = '0'.repeat(big.length - small.length) + small;
  let diff = 0;
  for (let i = 0; i < big.length; ++i) {
    if (big[i] !== small[i]) ++diff;
  }
  return diff;
}

// one-liner - basically the above
var solution_2=(x,y,t='toString',l='length',X=x[t](2),Y=y[t](2))=>{[b,s]=X[l]>Y[l]?[X,Y]:[Y,X];s='0'.repeat(b[l]-s[l])+s;for(i=d=0;i<b[l];++i)b[i]==s[i]?0:++d;return d}

// thomas luo's one-liner - he compares the ones digits of `x` and `y` by seeing if `x%2 !== y%2`, and if they differ, he increments `d`. then, either way, he "pops" off the ones digit and continues
var solution_3=(x,y,d=0)=>{while(x|y){x%2!=y%2?d++:0;x=(x-x%2)/2;y=(y-y%2)/2}return d}

// alex mok's one-liner - (x^y).toString(2) will produce the binary representation of the XOR of `x` and `y` - the number of 1s it contains is the answer. splitting with `1` as the delimiter will
// create an array such that even if `1` is at either end of the string, there will be empty string ('') elements at the corresponding end(s) of the array. like a fencepost, the number of elements minus
// 1 will be the answer
var solution_4=(x,y)=>(x^y).toString(2).split`1`.length-1

const hammingDistance = solution_4;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = hammingDistance;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  x: 1,
  y: 4,
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: