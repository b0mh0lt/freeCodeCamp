/*
Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.
The first two numbers in the Fibonacci sequence are 1 and 1.
Every additional number in the sequence is the sum of the two previous numbers.
The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.
For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.
*/

function sumFibs(num) {
  var arr = [0, 1];
  for (var i = 0; arr[i] + arr[i + 1] <= num; i++) {
    arr.push(arr[i] + arr[i + 1]);
  }
  arr = arr.filter(function(val) {
    return val % 2 === 1;
  });
  return arr.reduce(function(a, b) {
    return a + b;
  });
}

sumFibs(4);
sumFibs(1);
sumFibs(1000);
sumFibs(4000000);
sumFibs(75024);
sumFibs(75025);
