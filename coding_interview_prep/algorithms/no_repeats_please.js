/*
Return the number of total permutations of the provided string that don't have repeated consecutive letters. 
Assume that all characters in the provided string are each unique.
For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating.
*/

function permAlone(str) {
  var permutations = [];
  var arr = str.split("");
  function swap(a, b) {
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  }
  function generate(n) {
    if (n === 1) {
      permutations.push(arr.join(""));
    } else {
      for (var i = 0; i != n; i++) {
        generate(n - 1);
        swap(n % 2 ? 0 : i, n - 1);
      }
    }
  }
  generate(arr.length);
  return permutations.filter(function (str) {
    return !str.match(/(.)\1+/g);
  }).length;
}

permAlone("aab");
permAlone("aaa");
permAlone("aabb");
permAlone("abcdefa");
permAlone("abfdefa");
permAlone("zzzzzzzz");
permAlone("a");
permAlone("aaab");
permAlone("aaabb");
