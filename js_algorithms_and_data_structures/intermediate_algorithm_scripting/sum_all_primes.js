/*
Sum all the prime numbers up to and including the provided number.
A prime number is defined as a number greater than one and having only two divisors, one and itself.
For example, 2 is a prime number because it's only divisible by one and two.
The provided number may not be a prime.
*/

function sumPrimes(num) {
  var sum = [];
  for (var i = 0; i <= num; i++) {
    if (isPrime(i)) {
      sum.push(i);
    }
  }
  return sum.reduce(function (a, b) {
    return a + b;
  });
}

function isPrime(num) {
  if (num < 2) {
    return false;
  }
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

sumPrimes(10);
sumPrimes(977);
