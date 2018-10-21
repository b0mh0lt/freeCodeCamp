/*
Return the provided string with the first letter of each word capitalized.
Make sure the rest of the word is in lower case.
For the purpose of this exercise, you should also capitalize connecting words like "the" and "of".
*/

function titleCase(str) {
  var arr = str.toLowerCase().split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
  }
  return arr.join(' ');
}

titleCase("I'm a little tea pot");
titleCase('sHoRt AnD sToUt');
titleCase('HERE IS MY HANDLE HERE IS MY SPOUT');
