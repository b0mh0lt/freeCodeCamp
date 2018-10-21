/*
Return the factorial of the provided integer.
If the integer is represented with the letter n, a factorial is the product of all positive integers less than or equal to n.
Factorials are often represented with the shorthand notation n!
For example: 5! = 1 * 2 * 3 * 4 * 5 = 120
Only integers greater than or equal to zero will be supplied to the function.
*/

function factorialize(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorialize(num - 1);
  }
}

factorialize(5);
factorialize(10);
factorialize(20);
factorialize(0);
