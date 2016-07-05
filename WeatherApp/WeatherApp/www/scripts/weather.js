var OpenWeatherAppKey = "90c8d5e0c3de4243594b16ed50da45bb";

function getWeatherWithCity() {

    var city = $('#city-input').val();

    var queryString =
        'http://api.openweathermap.org/data/2.5/weather?q='
        + city + ',pt&appid=' + OpenWeatherAppKey + '&units=metric';
    /*
    For temperature in Fahrenheit use units=imperial
    For temperature in Celsius use units=metric
    Temperature in Kelvin is used by default, no need to use units parameter in API call
    */
    $.getJSON(queryString, function (results) {
        showWeatherData(results);
    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });

    return false;
}

 function getWeatherWithGeoLocation() {

  navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
    { enableHighAccuracy: true });

  $('#error-msg').show();
  $('#error-msg').text('Determining your current location ...');

  $('#get-weather-btn').prop('disabled', true);
}



function showWeatherData(results) {

    if (results.weather.length) {

        $('#error-msg').hide();
        $('#forecast-data').hide();
        $('#weather-data').show();

        $('#title').text(results.name);
        $('#temperature').text(results.main.temp);
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].description);

        //$('#temp_min').text(results.main.temp_min);
        //$('#temp_max').text(results.main.temp_max);
        //var sunriseDate = new Date(results.sys.sunrise);
        //$('#sunrise').text(sunriseDate.toLocaleTimeString());

        //var sunsetDate = new Date(results.sys.sunset);
        //$('#sunset').text(sunsetDate.toLocaleTimeString());

        //icon
        var icon = results.weather[0].icon;
        var img = $('img');
        var default_url = "images/png/na.png";
        var img_url = "http://openweathermap.org/img/w/" + icon + ".png";
        img.error(function () {
            $(this).attr('src', default_url)
        });
        img.attr('src', img_url);


    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}


function onGetLocationSuccess(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var queryString =
      'http://api.openweathermap.org/data/2.5/weather?lat='
        + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=metric';

    $('#get-weather-btn').prop('disabled', false);

    $.getJSON(queryString, function (results) {

        showWeatherData(results);

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });

}

function onGetLocationError(error) {

  $('#error-msg').text('Error getting location');
  $('#get-weather-btn').prop('disabled', false);
}  

function getCurrentDate() {
    // get current date
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;
    return output;
}


