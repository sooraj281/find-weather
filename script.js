const API_KEY = 'd78a0447dfff5b7709c02b184865d0fd';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const weatherImages = {
    Clear: 'images/clear.png',
    Clouds: 'images/clouds.png',
    Drizzle: 'images/drizzle.png',
    Mist: 'images/mist.png',
    Rain: 'images/rain.png',
    Snow: 'images/snow.png',
    Wind: 'images/wind.png',
    Humidity: 'images/humidity.png'
};

const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

async function checkWeather(city) {
    const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    document.querySelector('.city').innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector('.weather-icon').src = weatherImages[data.weather[0].main] || weatherImages['Clear'];
    document.querySelector('.weather-desc').innerHTML = data.weather[0].description;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    updateBackground(data.weather[0].main.toLowerCase());
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

document.querySelector('input[type="text"]').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        checkWeather(searchInput.value);
    }
});

function updateBackground(weatherCondition) {
    const card = document.querySelector('.card');
    switch(weatherCondition) {
        case 'rain':
            card.style.background = 'linear-gradient(to bottom, #647d75, #1b262c)'; 
            break;
        case 'clear':
            card.style.background = 'linear-gradient(to bottom, #90EE90, #20B2AA)'; 
            break;
        case 'clouds':
            card.style.background = 'linear-gradient(to bottom, #d3d3d3, #808080)'; 
            break;
        case 'snow':
            card.style.background = 'linear-gradient(to bottom, #ffffff, #e0e0e0)'; 
            break;
        case 'thunderstorm':
            card.style.background = 'linear-gradient(to bottom, #4e4e50, #000000)'; 
            break;
        case 'drizzle':
            card.style.background = 'linear-gradient(to bottom, #b4b4b4, #8a8a8a)';
            break;
        default:
            card.style.background = 'linear-gradient(to bottom, #98FB98, #20B2AA)'; 
    }
}
