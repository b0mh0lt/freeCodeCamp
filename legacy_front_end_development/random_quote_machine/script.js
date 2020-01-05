const projectName = 'random-quote-machine';
localStorage.setItem('example_project', 'Random Quote Machine');

$(document).ready(function() {
  var quotes = [];
  var i = 0;
  var j;
  $.getJSON('./quotes.json', function(data) {
    quotes = data;
    newQuote();
  });
  $('#new-quote').on('click', function() {
    newQuote();
  });
  function newQuote() {
    i = Math.floor(Math.random() * quotes.length);
    if (i === j) {
      while (i === j) {
        i = Math.floor(Math.random() * quotes.length);
      }
    }
    j = i;
    getQuote(i);
  }
  function getQuote() {
    MotionUI.animateIn('.card-image', 'fade-in');
    $('#image').attr('src', './' + quotes[i].image);
    $('#image').attr('alt', quotes[i].author);
    $('#author').html(quotes[i].author);
    $('#text').html(quotes[i].text);
    $('#episode').html(quotes[i].episode);
    $('#share-quote').attr(
      'href',
      'https://www.facebook.com/sharer/sharer.php?u=https://codepen.io/b0mh0lt/full/beeRYb'
    );
    $('#tweet-quote').attr(
      'href',
      'https://twitter.com/intent/tweet?text=' +
        '"' +
        quotes[i].text +
        '" ―' +
        quotes[i].author +
        '&url=https://codepen.io/b0mh0lt/full/beeRYb'
    );
  }
});
