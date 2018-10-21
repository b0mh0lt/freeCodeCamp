$(document).ready(function() {
  var lat, lon;
  $('#unit2').on('click', function() {
    var temp = $('#temperature').text();
    if ($('#unit2').text() == '/ °F') {
      $('#temperature').html(Math.round((temp * 9) / 5 + 32));
      $('#unit1').html('°F');
      $('#unit2').html('/ °C');
      for (i = 0; i <= 7; i++) {
        var tempMax = $('#tempMax-day-' + i).text();
        var tempMin = $('#tempMin-day-' + i).text();
        $('#tempMax-day-' + i).html(Math.round((tempMax * 9) / 5 + 32));
        $('#tempMin-day-' + i).html(Math.round((tempMin * 9) / 5 + 32));
      }
    } else if ($('#unit2').text() == '/ °C') {
      $('#temperature').html(Math.round(((temp - 32) * 5) / 9));
      $('#unit1').html('°C');
      $('#unit2').html('/ °F');
      for (i = 0; i <= 7; i++) {
        var tempMax = $('#tempMax-day-' + i).text();
        var tempMin = $('#tempMin-day-' + i).text();
        $('#tempMax-day-' + i).html(Math.round(((tempMax - 32) * 5) / 9));
        $('#tempMin-day-' + i).html(Math.round(((tempMin - 32) * 5) / 9));
      }
    }
  });
  $('#carousel').owlCarousel({
    items: 5,
    itemsCustom: false,
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsTabletSmall: false,
    itemsMobile: [420, 4],
    singleItem: false,
    itemsScaleUp: false,
    slideSpeed: 200,
    autoPlay: false,
    navigation: false,
    pagination: false,
    responsive: true,
    responsiveRefreshRate: 200,
    responsiveBaseWidth: window,
    lazyLoad: false,
    autoHeight: false,
    jsonPath: false,
    jsonSuccess: false,
    dragBeforeAnimFinish: true,
    mouseDrag: true,
    touchDrag: true,
    transitionStyle: false,
    addClassActive: false
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPositionHTML, showPositionIP);
  }
  function showPositionHTML(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    showForecast();
  }
  function showPositionIP() {
    $.getJSON('https://geoip-db.com/json/', function(data) {
      lat = data.latitude;
      lon = data.longitude;
      showForecast();
    });
  }
  function showForecast(position) {
    $.getJSON(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        lat +
        ',' +
        lon +
        '&key=AIzaSyAXMXZFmmULPAuW-zEBPZLGebg3RAdft-I',
      function(data) {
        showLocation(data.results[0]);
      }
    );
    $.getJSON(
      'https://api.darksky.net/forecast/74065424d2567989648101b3cd548674/' + lat + ',' + lon + '?units=auto&callback=?',
      function(data) {
        showTime(data.currently.time);
        $('#summary').html(data.currently.summary);
        $('#temperature').html(Math.round(data.currently.temperature));
        showUnits(data.flags.units);
        showIcon(data.currently.icon, '#icon');
        showBackground(data.currently.icon);
        $('#precipitation').html(Math.round(data.currently.precipProbability * 100) + '%');
        showWindSpeed(data.flags.units, data.currently.windSpeed);
        showDayByDayForecast(data.daily);
      }
    );
  }
  function showLocation(location) {
    for (i = 0; i < location.address_components.length; i++) {
      if (location.address_components[i].types[0] == 'locality') {
        $('#location').html(location.address_components[i].long_name);
      }
    }
  }
  function showTime(time) {
    var dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = dayArr[new Date(time * 1000).getDay()];
    var hoursArr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
    var hours;
    var minutesArr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
    var minutes;
    if (new Date(time * 1000).getHours() < 10) {
      hours = hoursArr[new Date(time * 1000).getHours()];
    } else {
      hours = new Date(time * 1000).getHours();
    }
    if (new Date(time * 1000).getMinutes() < 10) {
      minutes = minutesArr[new Date(time * 1000).getMinutes()];
    } else {
      minutes = new Date(time * 1000).getMinutes();
    }
    $('#time').html(day + ', ' + hours + ':' + minutes);
  }
  function showUnits(unit) {
    if (unit == 'us') {
      $('#unit1').html('°F');
      $('#unit2').html('/ °C');
    } else {
      $('#unit1').html('°C');
      $('#unit2').html('/ °F');
    }
  }
  function showWindSpeed(units, windSpeed) {
    switch (units) {
      case 'us':
        $('#windspeed').html(Math.round(windSpeed) + ' mph');
        break;
      case 'si':
        $('#windspeed').html(Math.round(windSpeed * 3.6) + ' km/h');
        break;
      case 'ca':
        $('#windspeed').html(Math.round(windSpeed) + ' km/h');
        break;
      case 'uk2':
        $('#windspeed').html(Math.round(windSpeed) + ' mph');
        break;
    }
  }
  function showBackground(icon) {
    switch (icon) {
      case 'clear-day':
        $('.card-current').css('background-color', '#4caf50');
        break;
      case 'clear-night':
        $('.card-current').css('background-color', '#3f51b5');
        break;
      case 'rain':
        $('.card-current').css('background-color', '#2196f3');
        break;
      case 'snow':
        $('.card-current').css('background-color', '#2196f3');
        break;
      case 'sleet':
        $('.card-current').css('background-color', '#2196f3');
        break;
      case 'wind':
        $('.card-current').css('background-color', '#ff9800');
        break;
      case 'fog':
        $('.card-current').css('background-color', '#ffc107');
        break;
      case 'cloudy':
        $('.card-current').css('background-color', '#ffc107');
        break;
      case 'partly-cloudy-day':
        $('.card-current').css('background-color', '#009688');
        break;
      case 'partly-cloudy-night':
        $('.card-current').css('background-color', '#673ab7');
        break;
      case 'hail':
        $('.card-current').css('background-color', '#f44336');
        break;
      case 'thunderstorm':
        $('.card-current').css('background-color', '#f44336');
        break;
      case 'tornado':
        $('.card-current').css('background-color', '#f44336');
        break;
    }
  }
  function showDayByDayForecast(daily) {
    for (i = 0; i <= 7; i++) {
      showDay(daily.data[i].time, '#day-' + i);
      showIcon(daily.data[i].icon, '#icon-day-' + i);
      showTempMax(daily.data[i].temperatureMax, '#tempMax-day-' + i);
      showTempMin(daily.data[i].temperatureMin, '#tempMin-day-' + i);
    }
  }
  function showDay(time, id) {
    var dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var day = dayArr[new Date(time * 1000).getDay()];
    $(id).html(day);
  }
  function showIcon(icon, id) {
    switch (icon) {
      case 'clear-day':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-clear-day');
        break;
      case 'clear-night':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-clear-night');
        break;
      case 'rain':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-rain');
        break;
      case 'snow':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-snow');
        break;
      case 'sleet':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-sleet');
        break;
      case 'wind':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-wind');
        break;
      case 'fog':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-fog');
        break;
      case 'cloudy':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-cloudy');
        break;
      case 'partly-cloudy-day':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-partly-cloudy-day');
        break;
      case 'partly-cloudy-night':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-partly-cloudy-night');
        break;
      case 'hail':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-hail');
        break;
      case 'thunderstorm':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-thunderstorm');
        break;
      case 'tornado':
        $(id).removeClass();
        $(id).addClass('wi wi-forecast-io-tornado');
        break;
      default:
        $(id).removeClass();
        $(id).addClass('wi wi-na');
    }
  }
  function showTempMax(temp, id) {
    $(id).html(Math.round(temp));
  }
  function showTempMin(temp, id) {
    $(id).html(Math.round(temp));
  }
});
