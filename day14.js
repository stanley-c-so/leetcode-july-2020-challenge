// --- Day 14: Angle Between Hands of a Clock ---

// Given two numbers, hour and minutes. Return the smaller angle (in degrees) formed between the hour and the minute hand.

// Example 1:

// Input: hour = 12, minutes = 30
// Output: 165

// Example 2:

// Input: hour = 3, minutes = 30
// Output: 75

// Example 3:

// Input: hour = 3, minutes = 15
// Output: 7.5

// Example 4:

// Input: hour = 4, minutes = 50
// Output: 155

// Example 5:

// Input: hour = 12, minutes = 0
// Output: 0

// Constraints:

// 1 <= hour <= 12
// 0 <= minutes <= 59
// Answers within 10^-5 of the actual value will be accepted as correct.

// ----------

// this is a simple math problem. the only "gotcha" to beware of is that after you find the absolute difference between the hands, it is possible that you have measured the "wrong way" and the difference
// is greater than 180 degrees, in which case you just subtract your answer from 360 degrees.
function solution_1 (hour, minutes) {
  const minAngle = minutes * 6;                         // 60 minutes = 360 degrees
  const hourAngle = hour * 30 + (minutes / 60) * 30;    // 12 hours = 360 degrees; don't forget to add additional angle for minutes: 60 minutes = 30 degrees
  const diff = Math.abs(minAngle - hourAngle);          // find the absolute difference
  return Math.min(diff, 360 - diff);                    // if answer is greater than 180, subtract it from 360
}

// one-liner - basically the above
var solution_2=(h,m,d=Math.abs(m*6-h*30-m/2))=>d>180?360-d:d

// thomas luo's one-liner - basically the above
var solution_3=(h,m)=>(t=Math.abs(30*h-5.5*m))>180?360-t:

const angleClock = solution_3;

const specialTest = (hour, mins, expected) => {
  return Math.abs(angleClock(hour, mins) - expected) <= 0.00001;        // answers within 10^-5 of the actual value will be accepted as correct
};

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
  hour: 12,
  mins: 30,
  expected: 165,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  hour: 3,
  mins: 30,
  expected: 75,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  hour: 3,
  mins: 15,
  expected: 7.5,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  hour: 4,
  mins: 50,
  expected: 155,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  hour: 12,
  mins: 0,
  expected: 0,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: