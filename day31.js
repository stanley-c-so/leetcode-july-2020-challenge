// --- Day 31: Climbing Stairs ---

// You are climbing a stair case. It takes n steps to reach to the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Example 1:

// Input: 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:

// Input: 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step
 
// Constraints:

// 1 <= n <= 45

// ----------

// this is just fibonacci sequence in disguise, because since you can only get to the `n`th step from the `n - 1`th step OR the `n - 2`th step, thus f(n) = f(n - 1) + f(n - 2), where f(0) = f(1) = 1.
function solution_1 (n, memo = {0: 1, 1: 1}) {
  if (!(n in memo)) memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}

// one-liner - basically the above
solution_2=(n,m={0:1,1:1},c=climbStairs)=>(m[n]?1:m[n]=c(n-1,m)+c(n-2,m))&&m[n]

// thomas luo's one-liner - advances `a` and `b` which hold the temporary values, and stops when `n` runs out!
// NOTE: won't play nice with my template, so i'll leave it commented out
// v=climbStairs=(n,a=1,b=1)=>--n?v(n,b,a+b):b

// using F(n) = (phi^n - psi^n) / sqrt(5), and phi = (1 + sqrt(5))/2 and psi = -1/phi.
solution_3=(n,s=Math.sqrt(5),F=(1+s)/2,Y=1/-F)=>++n&&Math.round((F**n-Y**n)/s)

const climbStairs = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = climbStairs;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: 2,
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  n: 3,
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: