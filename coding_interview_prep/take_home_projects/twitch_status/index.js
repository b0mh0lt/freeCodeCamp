$(document).ready(function() {
  var topStreamer = [
    'syndicate',
    'riotgames',
    'esl_csgo',
    'Nightblue3',
    'summit1g',
    'LIRIK',
    'PhantomL0rd',
    'captainsparklez',
    'sodapoppin',
    'imaqtpie'
  ];
  for (var i = 0; i < topStreamer.length; i++) {
    (function(i) {
      $.getJSON(
        'https://api.twitch.tv/kraken/streams/' +
          topStreamer[i] +
          '?client_id=cema7py8k01bs7x8g7p9dig9fk5f91e&callback=?',
        function(streams) {
          if (streams.status === 422) {
            $('.offline-channels').show();
            $('.offline-channels').append(
              "<div class='col-xs-12 col-sm-6 col-md-4 channel'><a href='https://www.twitch.tv/" +
                topStreamer[i] +
                "' target='_blank' rel='noopener noreferrer'><img class='img-responsive' src='img/twitch_closed.jpg'></a><div class='channel-info'><h4><strong><em>CHANNEL CLOSED</em></strong></h4><h5>" +
                topStreamer[i] +
                '</h5></div></div>'
            );
          } else if (streams.stream == null) {
            $.getJSON(
              'https://api.twitch.tv/kraken/channels/' +
                topStreamer[i] +
                '?client_id=cema7py8k01bs7x8g7p9dig9fk5f91e&callback=?',
              function(channels) {
                $('.offline-channels').show();
                if (channels.video_banner == null) {
                  $('.offline-channels').append(
                    "<div class='col-xs-12 col-sm-6 col-md-4 channel'><a href='https://www.twitch.tv/" +
                      topStreamer[i] +
                      "' target='_blank' rel='noopener noreferrer'><img class='img-responsive' src='img/twitch_null.jpg'></a><div class='channel-info'><h4>" +
                      channels.status.substring(0, 26) +
                      '...</h4><h5>' +
                      topStreamer[i] +
                      '</h5></div></div>'
                  );
                } else {
                  $('.offline-channels').append(
                    "<div class='col-xs-12 col-sm-6 col-md-4 channel'><a href='https://www.twitch.tv/" +
                      topStreamer[i] +
                      "' target='_blank' rel='noopener noreferrer'><img class='img-responsive' src='" +
                      channels.video_banner +
                      "'></a><div class='channel-info'><h4>" +
                      channels.status.substring(0, 26) +
                      '...</h4><h5>' +
                      topStreamer[i] +
                      '</h5></div></div>'
                  );
                }
              }
            );
          } else {
            $('.live-channels').show();
            $('.live-channels').append(
              "<div class='col-xs-12 col-sm-6 col-md-4 channel'><a href='https://www.twitch.tv/" +
                topStreamer[i] +
                "' target='_blank' rel='noopener noreferrer'><img class='img-responsive' src='" +
                streams.stream.preview.large +
                "'></a><div class='channel-info'><h4>" +
                streams.stream.channel.status.substring(0, 26) +
                '...</h4><h5>' +
                topStreamer[i] +
                '</h5></div></div>'
            );
          }
        }
      );
    })(i);
  }
  $.getJSON(
    'https://api.twitch.tv/kraken/streams/freecodecamp?client_id=cema7py8k01bs7x8g7p9dig9fk5f91e&callback=?',
    function(stream) {
      if (stream.stream == null) {
        $.getJSON(
          'https://api.twitch.tv/kraken/channels/freecodecamp?client_id=cema7py8k01bs7x8g7p9dig9fk5f91e&callback=?',
          function(channel) {
            $('#fcc-preview').append("<img class='img-responsive' src='" + channel.video_banner + "'>");
            $('#fcc-preview').append(
              "<a href='" +
                channel.url +
                "' target='_blank' rel='noopener noreferrer'><div class='overlay'><i class='fa fa-play'></i></div></a>"
            );
            $('#fcc-preview').append('<h5>offline</h5>');
            $('#fcc-profile').append("<img src='" + channel.logo + "'>");
            $('#fcc-profile').append('<h4>' + channel.display_name + '</h4>');
            if (channel.game.length > 23) {
              $('#fcc-profile').append(
                "<a href='https://www.twitch.tv/directory/game/" +
                  encodeURI(channel.game) +
                  "' target='_blank' rel='noopener noreferrer'>" +
                  channel.game.substring(0, 20) +
                  '...</a>'
              );
            } else {
              $('#fcc-profile').append(
                "<a href='https://www.twitch.tv/directory/game/" +
                  encodeURI(channel.game) +
                  "' target='_blank' rel='noopener noreferrer'>" +
                  channel.game +
                  '</a>'
              );
            }
            if (channel.status.length > 52) {
              $('#fcc-profile').append("<h3 class='hidden-xs'>" + channel.status.substring(0, 49) + '...</h3>');
            } else {
              $('#fcc-profile').append("<h3 class='hidden-xs'>" + channel.status + '</h3>');
            }
          }
        );
      } else {
        $('#fcc-preview').append("<img class='img-responsive' src='" + stream.stream.preview.large + "'>");
        $('#fcc-preview').append(
          "<a href='" +
            stream.stream.channel.url +
            "' target='_blank' rel='noopener noreferrer'><div class='overlay'><i class='fa fa-play'></i></div></a>"
        );
        $('#fcc-preview').append("<h5><i class='fa fa-circle'></i> live</h5>");
        $('#fcc-profile').append("<img src='" + stream.stream.channel.logo + "'>");
        $('#fcc-profile').append('<h4>' + stream.stream.channel.display_name + '</h4>');
        if (stream.stream.channel.game.length > 23) {
          $('#fcc-profile').append(
            "<a href='https://www.twitch.tv/directory/game/" +
              encodeURI(stream.stream.channel.game) +
              "' target='_blank' rel='noopener noreferrer'>" +
              stream.stream.channel.game.substring(0, 20) +
              '...</a>'
          );
        } else {
          $('#fcc-profile').append(
            "<a href='https://www.twitch.tv/directory/game/" +
              encodeURI(stream.stream.channel.game) +
              "' target='_blank' rel='noopener noreferrer'>" +
              stream.stream.channel.game +
              '</a>'
          );
        }
        if (stream.stream.channel.status.length > 52) {
          $('#fcc-profile').append(
            "<h3 class='hidden-xs'>" + stream.stream.channel.status.substring(0, 49) + '...</h3>'
          );
        } else {
          $('#fcc-profile').append("<h3 class='hidden-xs'>" + stream.stream.channel.status + '</h3>');
        }
      }
    }
  );
});
