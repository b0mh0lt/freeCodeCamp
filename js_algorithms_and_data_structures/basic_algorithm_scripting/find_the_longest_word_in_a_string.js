/*
Return the length of the longest word in the provided sentence.
Your response should be a number.
*/

function findLongestWordLength(str) {
  var longestWord = str.split(" ").sort(function (a, b) {
    return b.length - a.length;
  });
  return longestWord[0].length;
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");
findLongestWordLength("May the force be with you");
findLongestWordLength("Google do a barrel roll");
findLongestWordLength("What is the average airspeed velocity of an unladen swallow");
findLongestWordLength("What if we try a super-long word such as otorhinolaryngology");
