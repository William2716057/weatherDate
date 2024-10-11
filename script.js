
document.getElementById('weatherForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const dateTime = `${date} ${time}`;

    const weatherData = await getWeather(location, dateTime);
    displayWeather(weatherData);
});

async function getWeather(location, dateTime) {
    const apiKey = 'YOUR_API_KEY'; 
    const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${dateTime.split(' ')[0]}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();


    const hours = dateTime.split(' ')[1].split(':')[0];
    const historicalData = data.forecast.forecastday[0].hour.find(hour => hour.time.split(' ')[1].split(':')[0] == hours);

    return historicalData;
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');

    if (!data) {
        weatherResult.innerHTML = `<p>Error: Weather data not found</p>`;
        return;
    }

    const time = data.time.split(' ')[1];
    const temp = data.temp_c;
    const condition = data.condition.text;

    weatherResult.innerHTML = `
        <p>Weather at ${time}: ${temp}°C, ${condition}</p>
    `;
}
