$(document).ready(function() {
  var strict,
    turn = false;
  var pattern = {
    color: ['green', 'red', 'yellow', 'blue'],
    count: 0,
    computer: [],
    player: []
  };
  var highlight;
  function clearGame() {
    pattern.count = 0;
    pattern.computer = [];
  }
  function clearUser() {
    pattern.player = [];
  }
  function addCount() {
    pattern.count++;
    setTimeout(function() {
      $('.counter').html(pattern.count);
    }, 1000);
  }
  function flashMessage(msg) {
    $('.counter').html(msg);
    var lf = function() {
      $('.counter').hide();
      var HnFl = setTimeout(function() {
        $('.counter').show();
      }, 250);
    };
    var cnt = 0;
    lf();
    flHn = setInterval(function() {
      lf();
      cnt++;
      if (cnt === 2) {
        clearInterval(flHn);
      }
    }, 500);
  }
  function startGame() {
    clearGame();
    $('.counter').html('––');
    flashMessage('––');
    setTimeout(function() {
      addCount();
      generateGamePattern();
    }, 500);
  }
  function generateGamePattern() {
    pattern.computer.push(pattern.color[Math.floor(Math.random() * 4)]);
    showGamePattern();
  }
  function showGamePattern() {
    var i = 0;
    highlight = setInterval(function() {
      switch (pattern.computer[i]) {
        case 'green':
          $('#green').css('background-color', '#7FE283');
          $('#green-audio')[0].play();
          setTimeout(function() {
            $('#green').css('background-color', '#4CAF50');
          }, 500);
          break;
        case 'red':
          $('#red').css('background-color', '#FF7669');
          $('#red-audio')[0].play();
          setTimeout(function() {
            $('#red').css('background-color', '#F44336');
          }, 500);
          break;
        case 'yellow':
          $('#yellow').css('background-color', '#FFFF6E');
          $('#yellow-audio')[0].play();
          setTimeout(function() {
            $('#yellow').css('background-color', '#FFEB3B');
          }, 500);
          break;
        case 'blue':
          $('#blue').css('background-color', '#54C9FF');
          $('#blue-audio')[0].play();
          setTimeout(function() {
            $('#blue').css('background-color', '#2196F3');
          }, 500);
          break;
      }
      i++;
      if (i >= pattern.computer.length) {
        clearInterval(highlight);
        turn = true;
        $('.col').css('cursor', 'pointer');
      }
    }, 1000);
    clearUser();
  }
  function checkUserPattern(col) {
    if (pattern.player[pattern.player.length - 1] !== pattern.computer[pattern.player.length - 1]) {
      if (strict) {
        turn = false;
        $('.col').css('cursor', 'default');
        flashMessage('!!');
        $(col + '-audio')[0].pause();
        $(col + '-audio')[0].currentTime = 0;
        $('#error-audio')[0].play();
        setTimeout(function() {
          startGame();
        }, 1000);
      } else {
        turn = false;
        $('.col').css('cursor', 'default');
        flashMessage('!!');
        $(col + '-audio')[0].pause();
        $(col + '-audio')[0].currentTime = 0;
        $('#error-audio')[0].play();
        setTimeout(function() {
          showGamePattern();
          setTimeout(function() {
            $('.counter').html(pattern.count);
          }, 1000);
        }, 1000);
      }
    } else {
      var check = pattern.computer.length === pattern.player.length;
      if (check) {
        if (pattern.count == 20) {
          alert('Congratulations, You Won!');
        } else {
          turn = false;
          $('.col').css('cursor', 'default');
          addCount();
          generateGamePattern();
        }
      }
    }
  }
  $('#green').click(function() {
    if (turn) {
      $('#green').css('background-color', '#7FE283');
      $('#green-audio')[0].play();
      setTimeout(function() {
        $('#green').css('background-color', '#4CAF50');
      }, 500);
      pattern.player.push('green');
      checkUserPattern('#green');
    }
  });
  $('#red').click(function() {
    if (turn) {
      $('#red').css('background-color', '#FF7669');
      $('#red-audio')[0].play();
      setTimeout(function() {
        $('#red').css('background-color', '#F44336');
      }, 500);
      pattern.player.push('red');
      checkUserPattern('#red');
    }
  });
  $('#yellow').click(function() {
    if (turn) {
      $('#yellow').css('background-color', '#FFFF6E');
      $('#yellow-audio')[0].play();
      setTimeout(function() {
        $('#yellow').css('background-color', '#FFEB3B');
      }, 500);
      pattern.player.push('yellow');
      checkUserPattern('#yellow');
    }
  });
  $('#blue').click(function() {
    if (turn) {
      $('#blue').css('background-color', '#54C9FF');
      $('#blue-audio')[0].play();
      setTimeout(function() {
        $('#blue').css('background-color', '#2196F3');
      }, 500);
      pattern.player.push('blue');
      checkUserPattern('#blue');
    }
  });
  $('#start').click(function() {
    $('#green-audio')[0].volume = 0;
    $('#red-audio')[0].volume = 0;
    $('#yellow-audio')[0].volume = 0;
    $('#blue-audio')[0].volume = 0;
    $('#green-audio')[0].play();
    $('#red-audio')[0].play();
    $('#yellow-audio')[0].play();
    $('#blue-audio')[0].play();
    $('#green-audio')[0].pause();
    $('#red-audio')[0].pause();
    $('#yellow-audio')[0].pause();
    $('#blue-audio')[0].pause();
    $('#green-audio')[0].currentTime = 0;
    $('#red-audio')[0].currentTime = 0;
    $('#yellow-audio')[0].currentTime = 0;
    $('#blue-audio')[0].currentTime = 0;
    $('#green-audio')[0].volume = 1;
    $('#red-audio')[0].volume = 1;
    $('#yellow-audio')[0].volume = 1;
    $('#blue-audio')[0].volume = 1;
    $('#start').hide();
    $('#stop').css('display', 'block');
    $('#restart').removeClass('disabled');
    $('.counter').show();
    startGame();
  });
  $('#stop').click(function() {
    $('#stop').hide();
    $('#start').show();
    $('#restart').addClass('disabled');
    $('.counter').hide();
    clearInterval(highlight);
  });
  $('#restart').click(function() {
    clearInterval(highlight);
    startGame();
  });
  $('#strict').change(function() {
    if ($(this).is(':checked')) {
      strict = true;
    } else {
      strict = false;
    }
  });
});
