/*
Remove all falsy values from an array.
Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.
Hint: Try converting each value to a Boolean.
*/

function bouncer(arr) {
  return arr.filter(Boolean);
}

bouncer([7, 'ate', '', false, 9]);
bouncer(['a', 'b', 'c']);
bouncer([false, null, 0, NaN, undefined, '']);
bouncer([1, null, NaN, 2, undefined]);
