$(document).ready(function() {
  var sessionLength = parseInt($('#session-input').val() * 60);
  var breakLength = parseInt($('#break-input').val() * 60);
  var time,
    lastFrame = 0;
  var sessionInterval, sessionTimeout, breakInterval, breakTimeout;
  var session = true;
  var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? true
    : false;
  var muted = true;
  var alert = $('#levelup-audio')[0];
  $('#task').html($('#task-input').val() + ' session');
  $('#task-input').keyup(function() {
    $('#task').html($('#task-input').val() + ' session');
  });
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notifications.');
  }
  if (!mobile) {
    Notification.requestPermission().then(function(result) {
      console.log(result);
    });
  }
  $('#notification-input').focusin(function() {
    $('.select-dropdown').slideDown('fast');
  });
  $('#notification-input').focusout(function() {
    setTimeout(hideDropdown, 100);
  });
  function hideDropdown() {
    $('.select-dropdown').fadeOut('fast');
  }
  $('#bumptious').click(function() {
    alert.pause();
    alert.currentTime = 0;
    $('#notification-input').val('Bumptious');
    $('.select').removeClass('active');
    $('#bumptious').addClass('active');
    $('.select-input').css('color', '#212121');
    alert = $('#bumptious-audio')[0];
    muted = false;
    setTimeout(playAlert, 100);
  });
  $('#levelup').click(function() {
    alert.pause();
    alert.currentTime = 0;
    $('#notification-input').val('Level Up');
    $('.select').removeClass('active');
    $('#levelup').addClass('active');
    $('.select-input').css('color', '#212121');
    alert = $('#levelup-audio')[0];
    muted = false;
    setTimeout(playAlert, 100);
  });
  $('#yamahap95').click(function() {
    alert.pause();
    alert.currentTime = 0;
    $('#notification-input').val('Yamaha P95');
    $('.select').removeClass('active');
    $('#yamahap95').addClass('active');
    $('.select-input').css('color', '#212121');
    alert = $('#yamahap95-audio')[0];
    muted = false;
    setTimeout(playAlert, 100);
  });
  function playAlert() {
    alert.load();
    alert.play();
  }
  $('#circle').circleProgress({
    size: 320,
    startAngle: -Math.PI / 2,
    thickness: 5,
    fill: '#fff',
    value: 1
  });
  $('.numeric').keypress(function(e) {
    if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });
  $('#session-input').keyup(function() {
    sessionLength = parseInt($('#session-input').val() * 60);
    time = sessionLength;
    if (time % 60 >= 10) {
      $('#time').html(Math.floor(time / 60) + ':' + (time % 60));
    } else {
      $('#time').html(Math.floor(time / 60) + ':' + '0' + (time % 60));
    }
  });
  $('#break-input').keyup(function() {
    breakLength = parseInt($('#break-input').val() * 60);
  });
  stopTimer();
  function stopTimer() {
    pauseTimer();
    lastFrame = 0;
    $('body').css('background-color', '#f5f5f5');
    $('footer').css('background-color', '#eee');
    $('footer a').css('color', '#b3b3b3');
    time = sessionLength;
    if (time % 60 >= 10) {
      $('#time').html(Math.floor(time / 60) + ':' + (time % 60));
    } else {
      $('#time').html(Math.floor(time / 60) + ':' + '0' + (time % 60));
    }
    session = true;
  }
  function pauseTimer() {
    $($('#circle').circleProgress('widget')).stop();
    lastFrame = $('#circle').data('circle-progress').lastFrameValue;
    if (!session) {
      clearInterval(breakInterval);
    } else {
      clearInterval(sessionInterval);
    }
  }
  function playTimer() {
    lastFrame = 0;
    if (!session) {
      $('body').css('background-color', '#66bb6a');
      $('footer').css('background-color', '#43a047');
      $('footer a').css('color', '#cdeace');
      $('#task').html($('#task-input').val() + ' break');
      $('#circle').circleProgress({
        emptyFill: '#1b5e20',
        animationStartValue: lastFrame,
        animation: {
          duration: time * 1000
        }
      });
      breakInterval = setInterval(breakTick, 1000);
    } else {
      $('body').css('background-color', '#ef5350');
      $('footer').css('background-color', '#e53935');
      $('footer a').css('color', '#f9cecd');
      $('#circle').circleProgress({
        emptyFill: '#b71c1c',
        animationStartValue: lastFrame,
        animation: {
          duration: time * 1000
        }
      });
      sessionInterval = setInterval(sessionTick, 1000);
    }
  }
  function breakTick() {
    time--;
    if (time % 60 >= 10) {
      $('#time').html(Math.floor(time / 60) + ':' + (time % 60));
    } else {
      $('#time').html(Math.floor(time / 60) + ':' + '0' + (time % 60));
    }
    if (time === 0) {
      pauseTimer();
      breakTimeout = setTimeout(breakEvent, 1000);
    }
  }
  function sessionTick() {
    time--;
    if (time % 60 >= 10) {
      $('#time').html(Math.floor(time / 60) + ':' + (time % 60));
    } else {
      $('#time').html(Math.floor(time / 60) + ':' + '0' + (time % 60));
    }
    if (time === 0) {
      pauseTimer();
      sessionTimeout = setTimeout(sessionEvent, 1000);
    }
  }
  function breakEvent() {
    $('#pause').css('display', 'none');
    if (!mobile) {
      breakNotification();
    }
    if (!muted) {
      playAlert();
    }
  }
  function sessionEvent() {
    if (!mobile) {
      sessionNotification();
    }
    if (!muted) {
      playAlert();
    }
    time = breakLength;
    if (time % 60 >= 10) {
      $('#time').html(Math.floor(time / 60) + ':' + (time % 60));
    } else {
      $('#time').html(Math.floor(time / 60) + ':' + '0' + (time % 60));
    }
    session = false;
    playTimer();
  }
  function sessionNotification(theBody, theIcon, theTitle) {
    var options = {
      body:
        'Your ' +
        $('#task-input')
          .val()
          .toLowerCase() +
        ' session is over.',
      icon: 'img/session.png'
    };
    var n = new Notification('Pomodoro Notification', options);
    setTimeout(n.close.bind(n), 5000);
  }
  function breakNotification(theBody, theIcon, theTitle) {
    var options = {
      body:
        'Your ' +
        $('#task-input')
          .val()
          .toLowerCase() +
        ' break is over.',
      icon: 'img/break.png'
    };
    var n = new Notification('Pomodoro Notification', options);
    setTimeout(n.close.bind(n), 5000);
  }
  $('#play').click(function() {
    $('form').hide();
    $('.canvas-timer').show();
    $('#task').show();
    $('#play').css('display', 'none');
    $('.pdbtn').css('color', '#fff');
    $('#pause').css('display', 'inline-block');
    $('#stop').css('display', 'inline-block');
    playTimer();
  });
  $('#pause').click(function() {
    $('#pause').css('display', 'none');
    $('#play').css('display', 'inline-block');
    pauseTimer();
  });
  $('#stop').click(function() {
    $('.canvas-timer').hide();
    $('#task').hide();
    $('#task').html($('#task-input').val() + ' session');
    $('form').show();
    $('#pause').css('display', 'none');
    $('#stop').css('display', 'none');
    $('.pdbtn').css('color', '#ef5350');
    $('#play').css('display', 'inline-block');
    stopTimer();
  });
});
