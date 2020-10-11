/*
Repeat a given string str (first argument) for num times (second argument).
Return an empty string if num is not a positive number.
The built-in repeat()-method should not be used.
*/

function repeatStringNumTimes(str, num) {
  var arr = [];
  while (arr.length < num) {
    arr.push(str);
  }
  return arr.join("");
}

repeatStringNumTimes("*", 3);
repeatStringNumTimes("abc", 3);
repeatStringNumTimes("abc", 4);
repeatStringNumTimes("abc", 1);
repeatStringNumTimes("*", 8);
repeatStringNumTimes("abc", -2);
