const API_KEY = "703b9677d0f4ee1a373962c9e1e5cc78";

const getWeatherByCity = (city) => {
    let request = new XMLHttpRequest();
    request.open(
        "GET",
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
        true
    );

    request.send();

    try {
        request.onload = function () {
            let data = JSON.parse(this.response);
            console.log(data);
            getWeatherByLatLong(data.coord.lat, data.coord.lon); // Calling getWeatherByLatLong method from lat and long obtained from getWeatherByCity method
        };
    } catch(err) {
        console.log(err);
    }

    
};

const getWeatherByLatLong = (lat, long) => {
    let request = new XMLHttpRequest();

    request.open(
        "GET",
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`,
        true
    );

    request.send();
    
    try {
        request.onload = function () {
            let data = JSON.parse(this.response);
            console.log(data);
        };
    } catch(err) {
        console.log(err);
    }
    
};

getWeatherByCity("chennai");
