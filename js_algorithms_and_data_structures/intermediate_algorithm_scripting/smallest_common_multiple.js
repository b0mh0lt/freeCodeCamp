/*
Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.
The range will be an array of two numbers that will not necessarily be in numerical order.
For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also evenly divisible by all numbers between 1 and 3.
The answer here would be 6.
*/

function smallestCommons(arr) {
  var range = [];
  for (var i = Math.min.apply(null, arr); i <= Math.max.apply(null, arr); i++) {
    range.push(i);
  }
  return range.reduce(lcm);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function gcd(a, b) {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}

smallestCommons([1, 5]);
smallestCommons([5, 1]);
smallestCommons([2, 10]);
smallestCommons([1, 13]);
smallestCommons([23, 18]);
