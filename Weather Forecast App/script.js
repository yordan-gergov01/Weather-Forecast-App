const apiKey = '04c34d4d34c1b65372fe5c1254201197';
const url = 'https://api.openweathermap.org/data/2.5/weather';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const result = document.getElementById('weatherResult');

searchBtn.addEventListener('click', () =>{
    const city = cityInput.value.trim();

    if(!city){
        result.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const requestUrl = `${url}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(requestUrl)
    .then(res => {
        if(!res.ok){
            throw new Error('Sorry, not found!');
        }
        return res.json();
    })
    .then(data => {
        result.innerHTML = `
         <h2>${data.name}, ${data.sys.country}</h2>
          <img id="weatherIcon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
    })
    .catch(error => {
        result.innerHTML = 'Sorry, not found!';
    });
});
