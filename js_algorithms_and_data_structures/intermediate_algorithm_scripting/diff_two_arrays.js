/*
Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both.
In other words, return the symmetric difference of the two arrays.
Note: You can return the array with its elements in any order.
*/

function diffArray(arr1, arr2) {
  var newArr = [];
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) === -1) {
      newArr.push(arr2[i]);
    }
  }
  for (var j = 0; j < arr1.length; j++) {
    if (arr2.indexOf(arr1[j]) === -1) {
      newArr.push(arr1[j]);
    }
  }
  return newArr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
diffArray(
  ['diorite', 'andesite', 'grass', 'dirt', 'pink wool', 'dead shrub'],
  ['diorite', 'andesite', 'grass', 'dirt', 'dead shrub']
);
diffArray(
  ['andesite', 'grass', 'dirt', 'pink wool', 'dead shrub'],
  ['diorite', 'andesite', 'grass', 'dirt', 'dead shrub']
);
diffArray(['andesite', 'grass', 'dirt', 'dead shrub'], ['andesite', 'grass', 'dirt', 'dead shrub']);
diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
diffArray([1, 'calf', 3, 'piglet'], [1, 'calf', 3, 4]);
diffArray([], ['snuffleupagus', 'cookie monster', 'elmo']);
diffArray([1, 'calf', 3, 'piglet'], [7, 'filly']);
