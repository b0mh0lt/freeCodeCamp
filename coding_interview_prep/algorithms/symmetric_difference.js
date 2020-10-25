/*
The mathematical term symmetric difference (△ or ⊕) of two sets is the set of elements which are in either of the two sets but not in both. 
For example, for sets A = {1, 2, 3} and B = {2, 3, 4}, A △ B = {1, 4}.
Symmetric difference is a binary operation, which means it operates on only two elements. 
So to evaluate an expression involving symmetric differences among three elements (A △ B △ C), you must complete one operation at a time. 
Thus, for sets A and B above, and C = {2, 3}, A △ B △ C = (A △ B) △ C = {1, 4} △ {2, 3} = {1, 2, 3, 4}.
*/

function sym(args) {
  var args = Array.prototype.slice.call(arguments);
  function diff(arr1, arr2) {
    var arr = [];
    arr1.forEach(function (item) {
      if (arr2.indexOf(item) < 0 && arr.indexOf(item) < 0) {
        arr.push(item);
      }
    });
    arr2.forEach(function (item) {
      if (arr1.indexOf(item) < 0 && arr.indexOf(item) < 0) {
        arr.push(item);
      }
    });
    return arr;
  }
  return args.reduce(diff);
}

sym([1, 2, 3], [5, 2, 1, 4]);
sym([1, 2, 5], [2, 3, 5], [3, 4, 5]);
sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]);
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]);
