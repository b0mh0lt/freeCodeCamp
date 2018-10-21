/*
Create a function that sums two arguments together.
If only one argument is provided, then return a function that expects one argument and returns the sum.
For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.
Calling this returned function with a single argument will then return the sum:
var sumTwoAnd = addTogether(2);
sumTwoAnd(3) returns 5.
If either argument isn't a valid number, return undefined.
*/

function addTogether() {
  if (arguments.length === 1 && typeof arguments[0] === 'number') {
    var x = arguments[0];
    return function(y) {
      if (typeof y === 'number') {
        return x + y;
      }
    };
  } else if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
    return arguments[0] + arguments[1];
  }
}

addTogether(2, 3);
addTogether(2)(3);
addTogether('http://bit.ly/IqT6zt');
addTogether(2, '3');
addTogether(2)([3]);
