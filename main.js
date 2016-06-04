var time_cycle = 10000;
var on_time = 4000;

$(document).ready( function() {
    setTime();
    setWeather();

    // Update time minutely, weather hourly
    window.setInterval(setTime, 60000);
    window.setInterval(setWeather, 360000);

    window.setInterval(fadeOut, time_cycle);
    window.setTimeout(startFadeIn, (time_cycle - on_time));
});

function setTime() {
    var date = new Date();
    var min = date.getMinutes();
    var min_str = "";
    if (min >= 10) {
        min_str = min.toString();
    } else {
        min_str = "0" + min.toString();
    }

    var hour = date.getHours();
    var hour_str = "";
    if (hour >= 10) {
        hour_str = hour.toString();
    } else {
        hour_str = "0" + hour.toString();
    }

    $(".time").html(hour_str + ":" + min_str);
}

function setWeather() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Columbus,ohio&units=imperial", function(data) {
        var main = data.weather[0].main;
        var temp = data.main.temp;
        $(".condition").html(temp + "&deg;, " + main);
    });
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=Columbus,ohio&units=imperial&cnt=2", function(data) {
        var low_today = data.list[0].temp.min;
        var high_today = data.list[0].temp.max;
        $(".temperature").html(low_today + "&deg; " + high_today + "&deg;");
    });
}

function fadeOut() {
    $(".container").fadeOut(3000);
}

function startFadeIn() {
    setInterval(fadeIn, time_cycle);
}

function fadeIn() {
    $(".container").fadeIn(3000);
}
