$(document).ready(function() {
  var quotes = [];
  $.getJSON('quotes.json', function(data) {
    quotes = data;
    newQuote();
  });
  var i = 0;
  var j;
  $('#quote').on('click', function() {
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
    var $image = $('.card-image');
    $('#image').attr('src', quotes[i].image);
    $('#author').html(quotes[i].author);
    $('#text').html(quotes[i].text);
    $('#episode').html(quotes[i].episode);
    $('#share').attr(
      'href',
      'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent('https://bomholtm.github.io/fcc/legacy_front_end_development/random_quote_machine/')
    );
    $('#tweet').attr(
      'href',
      'https://twitter.com/intent/tweet?text=' + '"' + quotes[i].text + '" - ' + quotes[i].author
    );
    MotionUI.animateIn($image, 'fade-in');
  }
});
