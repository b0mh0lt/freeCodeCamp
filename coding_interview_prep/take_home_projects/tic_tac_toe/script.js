$(document).ready(function() {
  var player = 'X';
  var playerColor = '#545454';
  var computer = 'O';
  var computerColor = '#F1EBD3';
  var turn = true;
  var board = [null, null, null, null, null, null, null, null, null];
  var count = 0;
  function reset() {
    board = [null, null, null, null, null, null, null, null, null];
    $('.field').text('');
    count = 0;
    if ($('#playx').is(':checked')) {
      turn = true;
      $('.field').css('cursor', 'pointer');
    }
    if ($('#playo').is(':checked')) {
      turn = false;
      $('.field').css('cursor', 'default');
      computerMove();
    }
  }
  function playerMove(id) {
    var playerfield = $('#' + id).text();
    if (playerfield !== 'X' && playerfield !== 'O') {
      turn = false;
      $('.field').css('cursor', 'default');
      board[id] = player;
      $('#' + id).css('color', playerColor);
      $('#' + id).text(player);
      count++;
      checkMove(player);
    }
  }
  function computerMove() {
    var taken = true;
    count++;
    if (
      (board[1] === computer && board[2] === computer && board[0] !== player) ||
      (board[3] === computer && board[6] === computer && board[0] !== player) ||
      (board[4] === computer && board[8] === computer && board[0] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[0] = computer;
      $('#0').css('color', computerColor);
      $('#0').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === computer && board[2] === computer && board[1] !== player) ||
      (board[4] === computer && board[7] === computer && board[1] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[1] = computer;
      $('#1').css('color', computerColor);
      $('#1').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === computer && board[1] === computer && board[2] !== player) ||
      (board[5] === computer && board[8] === computer && board[2] !== player) ||
      (board[4] === computer && board[6] === computer && board[2] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[2] = computer;
      $('#2').css('color', computerColor);
      $('#2').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === computer && board[6] === computer && board[3] !== player) ||
      (board[4] === computer && board[5] === computer && board[3] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[3] = computer;
      $('#3').css('color', computerColor);
      $('#3').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === computer && board[8] === computer && board[4] !== player) ||
      (board[2] === computer && board[6] === computer && board[4] !== player) ||
      (board[1] === computer && board[7] === computer && board[4] !== player) ||
      (board[3] === computer && board[5] === computer && board[4] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[4] = computer;
      $('#4').css('color', computerColor);
      $('#4').text(computer);
      checkMove(computer);
    } else if (
      (board[2] === computer && board[8] === computer && board[5] !== player) ||
      (board[3] === computer && board[4] === computer && board[5] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[5] = computer;
      $('#5').css('color', computerColor);
      $('#5').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === computer && board[3] === computer && board[6] !== player) ||
      (board[7] === computer && board[8] === computer && board[6] !== player) ||
      (board[2] === computer && board[4] === computer && board[6] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[6] = computer;
      $('#6').css('color', computerColor);
      $('#6').text(computer);
      checkMove(computer);
    } else if (
      (board[1] === computer && board[4] === computer && board[7] !== player) ||
      (board[6] === computer && board[8] === computer && board[7] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[7] = computer;
      $('#7').css('color', computerColor);
      $('#7').text(computer);
      checkMove(computer);
    } else if (
      (board[2] === computer && board[5] === computer && board[8] !== player) ||
      (board[6] === computer && board[7] === computer && board[8] !== player) ||
      (board[0] === computer && board[4] === computer && board[8] !== player)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[8] = computer;
      $('#8').css('color', computerColor);
      $('#8').text(computer);
      checkMove(computer);
    } else if (
      (board[1] === player && board[2] === player && board[0] !== computer) ||
      (board[3] === player && board[6] === player && board[0] !== computer) ||
      (board[4] === player && board[8] === player && board[0] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[0] = computer;
      $('#0').css('color', computerColor);
      $('#0').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === player && board[2] === player && board[1] !== computer) ||
      (board[4] === player && board[7] === player && board[1] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[1] = computer;
      $('#1').css('color', computerColor);
      $('#1').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === player && board[1] === player && board[2] !== computer) ||
      (board[5] === player && board[8] === player && board[2] !== computer) ||
      (board[4] === player && board[6] === player && board[2] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[2] = computer;
      $('#2').css('color', computerColor);
      $('#2').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === player && board[6] === player && board[3] !== computer) ||
      (board[4] === player && board[5] === player && board[3] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[3] = computer;
      $('#3').css('color', computerColor);
      $('#3').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === player && board[8] === player && board[4] !== computer) ||
      (board[2] === player && board[6] === player && board[4] !== computer) ||
      (board[1] === player && board[7] === player && board[4] !== computer) ||
      (board[3] === player && board[5] === player && board[4] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[4] = computer;
      $('#4').css('color', computerColor);
      $('#4').text(computer);
      checkMove(computer);
    } else if (
      (board[2] === player && board[8] === player && board[5] !== computer) ||
      (board[3] === player && board[4] === player && board[5] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[5] = computer;
      $('#5').css('color', computerColor);
      $('#5').text(computer);
      checkMove(computer);
    } else if (
      (board[0] === player && board[3] === player && board[6] !== computer) ||
      (board[7] === player && board[8] === player && board[6] !== computer) ||
      (board[2] === player && board[4] === player && board[6] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[6] = computer;
      $('#6').css('color', computerColor);
      $('#6').text(computer);
      checkMove(computer);
    } else if (
      (board[1] === player && board[4] === player && board[7] !== computer) ||
      (board[6] === player && board[8] === player && board[7] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[7] = computer;
      $('#7').css('color', computerColor);
      $('#7').text(computer);
      checkMove(computer);
    } else if (
      (board[2] === player && board[5] === player && board[8] !== computer) ||
      (board[6] === player && board[7] === player && board[8] !== computer) ||
      (board[0] === player && board[4] === player && board[8] !== computer)
    ) {
      turn = true;
      $('.field').css('cursor', 'pointer');
      board[8] = computer;
      $('#8').css('color', computerColor);
      $('#8').text(computer);
      checkMove(computer);
    } else {
      while (taken === true) {
        var int = Math.floor(Math.random() * 9);
        var computerfield = $('#' + int).text();
        if (computerfield !== 'X' && computerfield !== 'O') {
          taken = false;
          turn = true;
          $('.field').css('cursor', 'pointer');
          board[int] = computer;
          $('#' + int).css('color', computerColor);
          $('#' + int).text(computer);
          checkMove(computer);
        }
      }
    }
  }
  function checkMove(current) {
    if (
      (board[0] === current && board[1] === current && board[2] === current) ||
      (board[3] === current && board[4] === current && board[5] === current) ||
      (board[6] === current && board[7] === current && board[8] === current) ||
      (board[0] === current && board[3] === current && board[6] === current) ||
      (board[1] === current && board[4] === current && board[7] === current) ||
      (board[2] === current && board[5] === current && board[8] === current) ||
      (board[0] === current && board[4] === current && board[8] === current) ||
      (board[2] === current && board[4] === current && board[6] === current)
    ) {
      turn = false;
      $('.field').css('cursor', 'default');
      setTimeout(function() {
        alert('"' + current + '" WON!');
        reset();
      }, 500);
    } else if (!turn && count < 9) {
      computerMove();
    } else if (count === 9) {
      setTimeout(function() {
        alert('DRAW!');
        reset();
      }, 500);
    }
  }
  $('.field').click(function() {
    if (turn) {
      playerMove($(this).attr('id'));
    }
  });
  $('.play').change(function() {
    if ($('#playx').is(':checked')) {
      player = 'X';
      playerColor = '#545454';
      computer = 'O';
      computerColor = '#F1EBD3';
      reset();
    }
    if ($('#playo').is(':checked')) {
      player = 'O';
      playerColor = '#F1EBD3';
      computer = 'X';
      computerColor = '#545454';
      reset();
    }
  });
});
