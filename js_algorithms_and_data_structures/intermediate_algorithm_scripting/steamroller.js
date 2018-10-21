/*
Flatten a nested array.
You must account for varying levels of nesting.
*/

function steamrollArray(arr) {
  var flatArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatArr = flatArr.concat(steamrollArray(arr[i]));
    } else {
      flatArr.push(arr[i]);
    }
  }
  return flatArr;
}

steamrollArray([1, [2], [3, [[4]]]]);
steamrollArray([[['a']], [['b']]]);
steamrollArray([1, [2], [3, [[4]]]]);
steamrollArray([1, [], [3, [[4]]]]);
steamrollArray([1, {}, [3, [[4]]]]);
