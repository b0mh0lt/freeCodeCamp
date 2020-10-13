$(document).ready(function() {
  $('input').val('');
  $('#init-input').focus();
  $('#init-input').keyup(function(e) {
    if (window.matchMedia('(min-width: 640px)').matches) {
      $('#wikipedia-init').hide();
      $('.container').removeClass('moz-container-fix');
      $('#row-init').removeClass('moz-row-fix');
      $('#wikipedia-top-bar').show();
      $('#top-bar-input').focus();
      $('#top-bar-input').val(this.value);
    } else {
      $('#top-bar-input').val(this.value);
    }
  });
  $('input').autocomplete({
    source: function(request, response) {
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
          action: 'opensearch',
          format: 'json',
          limit: 5,
          search: request.term
        },
        success: function(data) {
          response(data[1]);
        }
      });
    },
    select: function(event, ui) {
      if (event.which === 1) {
        search(ui.item.value);
        $('#top-bar-input').val(ui.item.value);
      }
    }
  });
  $('.search').on('click', function() {
    search($('#top-bar-input').val());
  });
  $('input').keyup(function(e) {
    var key = e.keyCode || e.which;
    if (key === 13) {
      $('#top-bar-input').autocomplete('close');
      search($('#top-bar-input').val());
    }
  });
  function search(input) {
    $('#wikipedia-results').empty();
    $('#wikipedia-init').hide();
    $('.container').removeClass('moz-container-fix');
    $('#row-init').removeClass('moz-row-fix');
    $('#wikipedia-top-bar').show();
    $('#top-bar-input').focus();
    if (input.length > 0) {
      $.getJSON(
        'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURI(input) + '&callback=?',
        function(data) {
          if (data[1].length == 0) {
            $('#wikipedia-results').append(
              "<div class='no-match'><p>There were no results matching the query.</p><p>The page <strong>\"" +
                $('#top-bar-input').val() +
                "\"</strong> does not exist. You can <a href='https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation' target='_blank' rel='noopener noreferrer'>ask for it to be created.</a></p><ul><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></ul></div>"
            );
          }
          for (var i = 0; i < data[1].length; i++) {
            $('#wikipedia-results').append("<div class='card card-" + i + "'></div>");
            $('.card-' + i).append("<div class='card-content card-content-" + i + "'></div>");
            $('.card-content-' + i).append('<h4>' + data[1][i] + '</h4>');
            $('.card-content-' + i).append('<p>' + data[2][i] + '</p>');
            if (data[2][i].length == 0) {
              $('.card-content-' + i).append('<p><i>No description available.</i></p>');
            }
            $('.card-' + i).append("<div class='card-link card-link-" + i + "'></div>");
            $('.card-link-' + i).append(
              "<a href='" + data[3][i] + "' target='_blank' rel='noopener noreferrer'>read more</a>"
            );
            $('.card-link-' + i).append(
              "<a href='https://en.wikipedia.org/w/index.php?title=" +
                encodeURI(data[1][i]) +
                "&action=edit' target='_blank' rel='noopener noreferrer'>edit source</a>"
            );
          }
        }
      );
      $('#wikipedia-results').show();
      $('#top-bar-input').focus();
      $('#top-bar-input')[0].setSelectionRange($('#top-bar-input').val().length, $('#top-bar-input').val().length);
    }
  }
});
