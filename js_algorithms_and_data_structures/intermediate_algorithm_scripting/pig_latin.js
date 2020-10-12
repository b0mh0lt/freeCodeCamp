/*
Translate the provided string to pig latin.
Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an "ay".
Link: https://en.wikipedia.org/wiki/Pig_Latin
If a word begins with a vowel you just add "way" to the end.
Input strings are guaranteed to be English words in all lowercase.
*/

function translatePigLatin(str) {
  var n = str.indexOf(str.match(/[aeiou]/));
  if (str[0].match(/[aeiou]/)) {
    return str + "way";
  } else if (n < 0) {
    return str + "ay";
  } else {
    return str.substr(n) + str.substr(0, n) + "ay";
  }
}

translatePigLatin("consonant");
translatePigLatin("california");
translatePigLatin("paragraphs");
translatePigLatin("glove");
translatePigLatin("algorithm");
translatePigLatin("eight");
