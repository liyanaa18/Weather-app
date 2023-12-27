$(function () {
  $('.search').click(function () {
    let city = $('#city').val();
    let formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
    $('#region').text(formattedCity);

    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/weather',
      type: 'GET',
      data: {
        q: city,
        appid: 'f0b7baa7245c8a2c47b01d80312a8c4f',
      },
      success: function (response) {
        let temperature = (response.main.temp - 273.15).toFixed(1);
        $('#temperature').text(`${temperature} °C`);
        $('#humidity').text(`Humidity: ${response.main.humidity} %`);
        $('#wind').text(`Wind: ${response.wind.speed.toFixed(1)} m/s`);
        getWeatherData(city);
      },
    });
  });

  function displayWeatherInfo(data) {
    const weatherInfoElement = document.getElementById('weather-info');
    
    weatherInfoElement.innerHTML = '';

    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    
    weatherInfoElement.innerHTML += `<p>${weatherDescription} <img src="${iconUrl}" alt="${weatherDescription}"></p>`;
  }

  async function getWeatherData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f0b7baa7245c8a2c47b01d80312a8c4f`);
      const data = await response.json();
      displayWeatherInfo(data);
    } catch (error) {
      console.error('Грешка при извличане на данни за времето:', error);
    }
  }
});
