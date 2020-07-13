// --- Day 12: Reverse Bits ---

// Reverse bits of a given 32 bits unsigned integer.

// Example 1:

// Input: 00000010100101000001111010011100
// Output: 00111001011110000010100101000000
// Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.

// Example 2:

// Input: 11111111111111111111111111111101
// Output: 10111111111111111111111111111111
// Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.
 
// Note:

// Note that in some languages such as Java, there is no unsigned integer type. In this case, both input and output will be given as signed integer type and should not affect your implementation, as the internal binary representation of the integer is the same whether it is signed or unsigned.
// In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above the input represents the signed integer -3 and the output represents the signed integer -1073741825.


// Follow up:

// If this function is called many times, how would you optimize it?

// ----------

function solution_1 (n) {                         // NOTE: `n` is a number
  const binary = n.toString(2);                   // convert input to binary string
  return parseInt((
    binary
      .split('')
      .reverse()
      .join('') + '0'.repeat(32 - binary.length)  // reverse `binary` and pad with enough 0s at the end to be length 32
  ), 2);                                          // and parseInt the resulting string (length 32) back into an integer
}

// one-liner - basically the above
var solution_2=(n,b=n.toString(2))=>parseInt(b.split('').reverse().join('')+'0'.repeat(32-b.length),2)

// thomas luo's one-liner - the exact same idea as what i did, except he takes advantage of String.padEnd which handles adding enough 0s at the end to achieve length 32
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
var solution_3=n=>parseInt(n.toString(2).split('').reverse().join('').padEnd(32,0),2)

// alex mok's improvement to the above (i slightly tweaked it) - adding '0b' to the beginning of a string that then gets coerced to a number means that the string will be read as a binary. the `-0`
// converts the string into number form.
var solution_4=n=>'0b'+n.toString(2).split``.reverse().join``.padEnd(32,0)-0

// alex mok's one-liner - takes advantage of eval function, which evaluates a string of code (this saves having to write the `return` keyword). here, alex uses a for loop to initialize `r` (the result)
// at 0, and repeat code 32 times: he effectively goes digit by digit (from right to left) through the binary `n`, doubling `r` with each digit, and then he extracts the ones digit through `n&1` (which is
// 1 if the ones digit of `n` is 1, or 0 if not), and then right binary shifts `n` via `n>>=1` to simulate iteration. by going right to left, that also captures the reversal process of the string.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
var solution_5=n=>eval('for(r=0,c=32;c--;)r*=2,r+=n&1,n>>=1;r')

const reverseBits = solution_5;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = reverseBits;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: parseInt('00000010100101000001111010011100', 2),
};
expected = parseInt('00111001011110000010100101000000', 2);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  n: parseInt('11111111111111111111111111111101', 2),
};
expected = parseInt('10111111111111111111111111111111', 2);
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: