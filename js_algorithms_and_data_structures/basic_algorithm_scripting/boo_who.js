/*
Check if a value is classified as a boolean primitive.
Return true or false.
Boolean primitives are true and false.
*/

function booWho(bool) {
  return typeof bool === 'boolean';
}

booWho(null);
booWho(true);
booWho(false);
booWho([1, 2, 3]);
booWho([].slice);
booWho({ a: 1 });
booWho(1);
booWho(NaN);
booWho('a');
booWho('true');
booWho('false');
