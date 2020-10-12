/*
You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments.
Remove all elements from the initial array that are of the same value as these arguments.
Note: You have to use the arguments object.
*/

function destroyer(arr) {
  var arg = [];
  var newArr = [];
  for (var i = 1; i < arguments.length; i++) {
    arg.push(arguments[i]);
  }
  for (var j = 0; j < arr.length; j++) {
    if (arg.indexOf(arr[j]) < 0) {
      newArr.push(arr[j]);
    }
  }
  return newArr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3);
destroyer([3, 5, 1, 2, 2], 2, 3, 5);
destroyer([2, 3, 2, 3], 2, 3);
destroyer(["tree", "hamburger", 53], "tree", 53);
destroyer(["possum", "trollo", 12, "safari", "hotdog", 92, 65, "grandma", "bugati", "trojan", "yacht"], "yacht", "possum", "trollo", "safari", "hotdog", "grandma", "bugati", "trojan");
