$(document).ready(function () {
  var lat, lon;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPositionHTML, showPositionIP);
  }
  $("#unit2").on("click", function () {
    var temp = $("#temperature").text();
    if ($("#unit2").text() == "°F") {
      $("#temperature").html(Math.round((temp * 9) / 5 + 32));
      $("#unit1").html("°F");
      $("#unit2").html("°C");
      for (i = 0; i <= 7; i++) {
        var tempMax = $("#tempMax-day-" + i).text();
        var tempMin = $("#tempMin-day-" + i).text();
        $("#tempMax-day-" + i).html(Math.round((tempMax * 9) / 5 + 32));
        $("#tempMin-day-" + i).html(Math.round((tempMin * 9) / 5 + 32));
      }
    } else if ($("#unit2").text() == "°C") {
      $("#temperature").html(Math.round(((temp - 32) * 5) / 9));
      $("#unit1").html("°C");
      $("#unit2").html("°F");
      for (i = 0; i <= 7; i++) {
        var tempMax = $("#tempMax-day-" + i).text();
        var tempMin = $("#tempMin-day-" + i).text();
        $("#tempMax-day-" + i).html(Math.round(((tempMax - 32) * 5) / 9));
        $("#tempMin-day-" + i).html(Math.round(((tempMin - 32) * 5) / 9));
      }
    }
  });
  $("#carousel").slick({
    arrows: false,
    infinite: false,
    slidesToShow: 8,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 438,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  });
  function showPositionHTML(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    showForecast();
  }
  function showPositionIP() {
    $.getJSON("https://ipinfo.io?token=4ee451ca8a589b", function (data) {
      var loc = data.loc.split(",");
      lat = loc[0];
      lon = loc[1];
      showForecast();
    });
  }
  function showForecast(position) {
    $.getJSON(
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
        lat +
        "&lon=" +
        lon +
        "&zoom=10",
      function (data) {
        $("#location").html(data.name);
      }
    );
    $.getJSON(
      "https://api.darksky.net/forecast/0bd7bdec8a9521465345b6c3cbf98c89/" +
        lat +
        "," +
        lon +
        "?units=auto&callback=?",
      function (data) {
        showTime(data.currently.time);
        $("#summary").html(data.currently.summary);
        $("#temperature").html(Math.round(data.currently.temperature));
        showUnits(data.flags.units);
        showIcon(data.currently.icon, "#icon");
        showBackground(data.currently.icon);
        $("#precipitation").html(Math.round(data.currently.precipProbability * 100) + "%");
        showWindSpeed(data.flags.units, data.currently.windSpeed);
        showDayByDayForecast(data.daily);
      }
    );
  }
  function showTime(time) {
    var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = dayArr[new Date(time * 1000).getDay()];
    var hoursArr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
    var hours;
    var minutesArr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
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
    $("#time").html(day + ", " + hours + ":" + minutes);
  }
  function showUnits(unit) {
    if (unit == "us") {
      $("#unit1").html("°F");
      $("#unit2").html("°C");
    } else {
      $("#unit1").html("°C");
      $("#unit2").html("°F");
    }
  }
  function showWindSpeed(units, windSpeed) {
    switch (units) {
      case "us":
        $("#windspeed").html(Math.round(windSpeed) + " mph");
        break;
      case "si":
        $("#windspeed").html(Math.round(windSpeed * 3.6) + " km/h");
        break;
      case "ca":
        $("#windspeed").html(Math.round(windSpeed) + " km/h");
        break;
      case "uk2":
        $("#windspeed").html(Math.round(windSpeed) + " mph");
        break;
    }
  }
  function showBackground(icon) {
    switch (icon) {
      case "clear-day":
        $(".card-header").css("background-color", "#4caf50");
        break;
      case "clear-night":
        $(".card-header").css("background-color", "#3f51b5");
        break;
      case "rain":
        $(".card-header").css("background-color", "#2196f3");
        break;
      case "snow":
        $(".card-header").css("background-color", "#2196f3");
        break;
      case "sleet":
        $(".card-header").css("background-color", "#2196f3");
        break;
      case "wind":
        $(".card-header").css("background-color", "#ff9800");
        break;
      case "fog":
        $(".card-header").css("background-color", "#ffc107");
        break;
      case "cloudy":
        $(".card-header").css("background-color", "#ffc107");
        break;
      case "partly-cloudy-day":
        $(".card-header").css("background-color", "#009688");
        break;
      case "partly-cloudy-night":
        $(".card-header").css("background-color", "#673ab7");
        break;
      case "hail":
        $(".card-header").css("background-color", "#f44336");
        break;
      case "thunderstorm":
        $(".card-header").css("background-color", "#f44336");
        break;
      case "tornado":
        $(".card-header").css("background-color", "#f44336");
        break;
    }
  }
  function showDayByDayForecast(daily) {
    for (i = 0; i <= 7; i++) {
      showDay(daily.data[i].time, "#day-" + i);
      showIcon(daily.data[i].icon, "#icon-day-" + i);
      showTempMax(daily.data[i].temperatureMax, "#tempMax-day-" + i);
      showTempMin(daily.data[i].temperatureMin, "#tempMin-day-" + i);
    }
  }
  function showDay(time, id) {
    var dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var day = dayArr[new Date(time * 1000).getDay()];
    $(id).html(day);
  }
  function showIcon(icon, id) {
    switch (icon) {
      case "clear-day":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-clear-day");
        break;
      case "clear-night":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-clear-night");
        break;
      case "rain":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-rain");
        break;
      case "snow":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-snow");
        break;
      case "sleet":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-sleet");
        break;
      case "wind":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-wind");
        break;
      case "fog":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-fog");
        break;
      case "cloudy":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-cloudy");
        break;
      case "partly-cloudy-day":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-partly-cloudy-day");
        break;
      case "partly-cloudy-night":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-partly-cloudy-night");
        break;
      case "hail":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-hail");
        break;
      case "thunderstorm":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-thunderstorm");
        break;
      case "tornado":
        $(id).removeClass();
        $(id).addClass("wi wi-forecast-io-tornado");
        break;
      default:
        $(id).removeClass();
        $(id).addClass("wi wi-na");
    }
  }
  function showTempMax(temp, id) {
    $(id).html(Math.round(temp));
  }
  function showTempMin(temp, id) {
    $(id).html(Math.round(temp));
  }
});
