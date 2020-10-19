window.onload = function() {
  var keys = document.getElementsByClassName('key'),
    operations = ['/', '*', '-', '+'],
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ')'],
    hiddenCalculation = document.querySelectorAll('.hidden-calculation h4')[0],
    latestCalculation = document.querySelectorAll('.latest-calculation h3')[0],
    openBracket = document.querySelectorAll('.result h1 .open-bracket')[0],
    closeBracket = document.querySelectorAll('.result h1 .close-bracket')[0],
    exponent = false;
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].innerHTML === '=') {
      keys[i].addEventListener('click', calculate());
    } else if (keys[i].innerHTML === 'DEL') {
      keys[i].addEventListener('click', remove());
    } else {
      keys[i].addEventListener('click', add(i));
    }
  }
  function add(i) {
    return function() {
      var lastCharVisible = openBracket.innerHTML.slice(-1),
        lastCharHidden = hiddenCalculation.innerHTML.slice(-1);
      document.getElementsByClassName('equals')[0].style.display = 'none';
      if (openBracket.innerHTML === 'Error') {
        openBracket.innerHTML = '';
        hiddenCalculation.innerHTML = '';
        document.getElementsByClassName('result')[0].style.color = '#212121';
      }
      switch (keys[i].innerHTML) {
        case '.':
          if (lastCharVisible.indexOf('.') > -1) {
            hiddenCalculation.innerHTML = hiddenCalculation.innerHTML.slice(0, -1);
            openBracket.innerHTML = openBracket.innerHTML.slice(0, -1);
            hiddenCalculation.innerHTML += '.';
            openBracket.innerHTML += '.';
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML += '.';
            openBracket.innerHTML += '.';
          } else {
            hiddenCalculation.innerHTML += '.';
            openBracket.innerHTML += '.';
          }
          break;
        case '÷':
          if (exponent) {
            hiddenCalculation.innerHTML += ')/';
            openBracket.innerHTML += ' ÷ ';
            exponent = false;
          } else if (operations.indexOf(lastCharHidden) > -1) {
            hiddenCalculation.innerHTML = hiddenCalculation.innerHTML.slice(0, -1);
            openBracket.innerHTML = openBracket.innerHTML.slice(0, -3);
            hiddenCalculation.innerHTML += '/';
            openBracket.innerHTML += ' ÷ ';
          } else {
            hiddenCalculation.innerHTML += '/';
            openBracket.innerHTML += ' ÷ ';
          }
          break;
        case '×':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*';
            openBracket.innerHTML += ' × ';
            exponent = false;
          } else if (operations.indexOf(lastCharHidden) > -1) {
            hiddenCalculation.innerHTML = hiddenCalculation.innerHTML.slice(0, -1);
            openBracket.innerHTML = openBracket.innerHTML.slice(0, -3);
            hiddenCalculation.innerHTML += '*';
            openBracket.innerHTML += ' × ';
          } else {
            hiddenCalculation.innerHTML += '*';
            openBracket.innerHTML += ' × ';
          }
          break;
        case '-':
          if (exponent) {
            hiddenCalculation.innerHTML += ')-';
            openBracket.innerHTML += ' - ';
            exponent = false;
          } else if (operations.indexOf(lastCharHidden) > -1) {
            hiddenCalculation.innerHTML = hiddenCalculation.innerHTML.slice(0, -1);
            openBracket.innerHTML = openBracket.innerHTML.slice(0, -3);
            hiddenCalculation.innerHTML += '-';
            openBracket.innerHTML += ' - ';
          } else {
            hiddenCalculation.innerHTML += '-';
            openBracket.innerHTML += ' - ';
          }
          break;
        case '+':
          if (exponent) {
            hiddenCalculation.innerHTML += ')+';
            openBracket.innerHTML += ' + ';
            exponent = false;
          } else if (operations.indexOf(lastCharHidden) > -1) {
            hiddenCalculation.innerHTML = hiddenCalculation.innerHTML.slice(0, -1);
            openBracket.innerHTML = openBracket.innerHTML.slice(0, -3);
            hiddenCalculation.innerHTML += '+';
            openBracket.innerHTML += ' + ';
          } else {
            hiddenCalculation.innerHTML += '+';
            openBracket.innerHTML += ' + ';
          }
          break;
        case 'sin':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*Math.sin(';
            openBracket.innerHTML += ' sin(';
            closeBracket.innerHTML += ')';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = 'Math.sin(';
            openBracket.innerHTML = 'sin(';
            closeBracket.innerHTML += ')';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*Math.sin(';
            openBracket.innerHTML += ' sin(';
            closeBracket.innerHTML += ')';
          } else {
            hiddenCalculation.innerHTML += 'Math.sin(';
            openBracket.innerHTML += 'sin(';
            closeBracket.innerHTML += ')';
          }
          break;
        case 'cos':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*Math.cos(';
            openBracket.innerHTML += ' cos(';
            closeBracket.innerHTML += ')';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = 'Math.cos(';
            openBracket.innerHTML = 'cos(';
            closeBracket.innerHTML += ')';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*Math.cos(';
            openBracket.innerHTML += ' cos(';
            closeBracket.innerHTML += ')';
          } else {
            hiddenCalculation.innerHTML += 'Math.cos(';
            openBracket.innerHTML += 'cos(';
            closeBracket.innerHTML += ')';
          }
          break;
        case 'tan':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*Math.tan(';
            openBracket.innerHTML += ' tan(';
            closeBracket.innerHTML += ')';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = 'Math.tan(';
            openBracket.innerHTML = 'tan(';
            closeBracket.innerHTML += ')';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*Math.tan(';
            openBracket.innerHTML += ' tan(';
            closeBracket.innerHTML += ')';
          } else {
            hiddenCalculation.innerHTML += 'Math.tan(';
            openBracket.innerHTML += 'tan(';
            closeBracket.innerHTML += ')';
          }
          break;
        case 'ln':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*Math.log(';
            openBracket.innerHTML += ' ln(';
            closeBracket.innerHTML += ')';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = 'Math.log(';
            openBracket.innerHTML = 'ln(';
            closeBracket.innerHTML += ')';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*Math.log(';
            openBracket.innerHTML += ' ln(';
            closeBracket.innerHTML += ')';
          } else {
            hiddenCalculation.innerHTML += 'Math.log(';
            openBracket.innerHTML += 'ln(';
            closeBracket.innerHTML += ')';
          }
          break;
        case 'log':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*Math.log10(';
            openBracket.innerHTML += ' log(';
            closeBracket.innerHTML += ')';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = 'Math.log10(';
            openBracket.innerHTML = 'log(';
            closeBracket.innerHTML += ')';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*Math.log10(';
            openBracket.innerHTML += ' log(';
            closeBracket.innerHTML += ')';
          } else {
            hiddenCalculation.innerHTML += 'Math.log10(';
            openBracket.innerHTML += 'log(';
            closeBracket.innerHTML += ')';
          }
          break;
        case '!':
          if (exponent) {
            var n = openBracket.innerHTML.split(/\s|\^/g)[openBracket.innerHTML.split(/\s|\^/g).length - 1];
            hiddenCalculation.innerHTML = hiddenCalculation.innerHTML.slice(0, -n.length);
            hiddenCalculation.innerHTML += factorial(n.replace(/\(|\)/g, '')) + ')';
            openBracket.innerHTML += '!';
            exponent = false;
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            var n = openBracket.innerHTML.split(/\s|\^/g)[openBracket.innerHTML.split(/\s|\^/g).length - 1];
            hiddenCalculation.innerHTML = hiddenCalculation.innerHTML.slice(0, -n.length);
            hiddenCalculation.innerHTML += factorial(n.replace(/\(|\)/g, ''));
            openBracket.innerHTML += '!';
          }
          break;
        case 'π':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*Math.PI';
            openBracket.innerHTML += ' π';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = 'Math.PI';
            openBracket.innerHTML = 'π';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*Math.PI';
            openBracket.innerHTML += ' π';
          } else {
            hiddenCalculation.innerHTML += 'Math.PI';
            openBracket.innerHTML += 'π';
          }
          break;
        case 'e':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*Math.E';
            openBracket.innerHTML += ' e';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = 'Math.E';
            openBracket.innerHTML = 'e';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*Math.E';
            openBracket.innerHTML += ' e';
          } else {
            hiddenCalculation.innerHTML += 'Math.E';
            openBracket.innerHTML += 'e';
          }
          break;
        case '^':
          if (numbers.indexOf(lastCharVisible) > -1) {
            var base = openBracket.innerHTML.split(' ')[openBracket.innerHTML.split(' ').length - 1];
            hiddenCalculation.innerHTML = hiddenCalculation.innerHTML.slice(0, -base.length);
            hiddenCalculation.innerHTML += 'Math.pow(' + base + ',';
            openBracket.innerHTML += '^';
            exponent = true;
          }
          break;
        case '(':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*(';
            openBracket.innerHTML += ' (';
            closeBracket.innerHTML += ')';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = '(';
            openBracket.innerHTML = '(';
            closeBracket.innerHTML += ')';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*(';
            openBracket.innerHTML += ' (';
            closeBracket.innerHTML += ')';
          } else {
            hiddenCalculation.innerHTML += '(';
            openBracket.innerHTML += '(';
            closeBracket.innerHTML += ')';
          }
          break;
        case ')':
          if (closeBracket.innerHTML.indexOf(')') > -1) {
            hiddenCalculation.innerHTML += ')';
            openBracket.innerHTML += ')';
            closeBracket.innerHTML = closeBracket.innerHTML.slice(0, -1);
          }
          break;
        case '√':
          if (exponent) {
            hiddenCalculation.innerHTML += ')*Math.sqrt(';
            openBracket.innerHTML += ' √(';
            closeBracket.innerHTML += ')';
            exponent = false;
          } else if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = 'Math.sqrt(';
            openBracket.innerHTML = '√(';
            closeBracket.innerHTML += ')';
          } else if (numbers.indexOf(lastCharVisible) > -1) {
            hiddenCalculation.innerHTML += '*Math.sqrt(';
            openBracket.innerHTML += ' √(';
            closeBracket.innerHTML += ')';
          } else {
            hiddenCalculation.innerHTML += 'Math.sqrt(';
            openBracket.innerHTML += '√(';
            closeBracket.innerHTML += ')';
          }
          break;
        default:
          if (hiddenCalculation.innerHTML === '0') {
            hiddenCalculation.innerHTML = keys[i].innerHTML;
            openBracket.innerHTML = keys[i].innerHTML;
          } else if (
            lastCharVisible.indexOf('!') > -1 ||
            lastCharVisible.indexOf('π') > -1 ||
            lastCharVisible.indexOf('e') > -1 ||
            lastCharVisible.indexOf(')') > -1
          ) {
            hiddenCalculation.innerHTML += '*' + keys[i].innerHTML;
            openBracket.innerHTML += ' × ' + keys[i].innerHTML;
          } else {
            hiddenCalculation.innerHTML += keys[i].innerHTML;
            openBracket.innerHTML += keys[i].innerHTML;
          }
      }
    };
  }
  function factorial(n) {
    if (n == 0 || n == 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  function remove() {
    return function() {
      document.getElementsByClassName('equals')[0].style.display = 'none';
      hiddenCalculation.innerHTML = '0';
      latestCalculation.innerHTML = '';
      openBracket.innerHTML = '0';
      closeBracket.innerHTML = '';
    };
  }
  function calculate() {
    return function() {
      latestCalculation.innerHTML = openBracket.innerHTML + closeBracket.innerHTML;
      while (closeBracket.innerHTML.indexOf(')') > -1) {
        hiddenCalculation.innerHTML += ')';
        closeBracket.innerHTML = closeBracket.innerHTML.slice(0, -1);
      }
      try {
        var result = eval(hiddenCalculation.innerHTML).toFixed(11);
        hiddenCalculation.innerHTML = parseFloat(result);
        openBracket.innerHTML = parseFloat(result);
        document.getElementsByClassName('equals')[0].style.display = 'block';
      } catch (error) {
        openBracket.innerHTML = 'Error';
        document.getElementsByClassName('result')[0].style.color = '#f44336';
      }
    };
  }
};
