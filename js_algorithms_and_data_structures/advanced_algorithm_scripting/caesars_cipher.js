/*
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher.
In a shift cipher the meanings of the letters are shifted by some set amount.
A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places.
Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.
Link: https://en.wikipedia.org/wiki/ROT13
Write a function which takes a ROT13 encoded string as input and returns a decoded string.
All letters will be uppercase.
Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/

function rot13(str) {
  var encodedArr = str.split('');
  var decodedArr = [];
  for (var i = 0; i < encodedArr.length; i++) {
    if (encodedArr[i].charCodeAt() >= 65 && encodedArr[i].charCodeAt() <= 77) {
      decodedArr.push(String.fromCharCode(encodedArr[i].charCodeAt() + 13));
    } else if (encodedArr[i].charCodeAt() >= 78 && encodedArr[i].charCodeAt() <= 90) {
      decodedArr.push(String.fromCharCode(encodedArr[i].charCodeAt() - 13));
    } else {
      decodedArr.push(encodedArr[i]);
    }
  }
  return decodedArr.join('');
}

rot13('SERR PBQR PNZC');
rot13('SERR CVMMN!');
rot13('SERR YBIR?');
rot13('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.');
