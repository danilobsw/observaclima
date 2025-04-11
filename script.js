const apiKey = 'd31295e7d1a23c2df86123e2dd407c6c'; // sua API key

function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  // Previsão atual
  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('weatherResult').innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.weather[0].description}</p>
        <p>🌡️ ${data.main.temp}°C</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      `;
    });

  // Previsão dos próximos dias
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      let forecastHTML = '<h3>Previsão para os próximos dias:</h3>';
      const middayForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

      middayForecasts.forEach(item => {
        const date = new Date(item.dt_txt);
        forecastHTML += `
          <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
            <strong>${date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</strong><br>
            ${item.weather[0].description}<br>
            🌡️ ${item.main.temp}°C<br>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">
          </div>
        `;
      });

      document.getElementById('forecastContainer').innerHTML = forecastHTML;
    });
}


        resultDiv.innerHTML = `
            <strong>${city.toUpperCase()}</strong><br>
            ${desc}<br>
            🌡️ ${temp} °C<br>
            💨 Vento: ${wind} m/s<br>
            💧 Umidade: ${humidity}%

              // Previsão dos próximos dias
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      let forecastHTML = '';
      const middayForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

      middayForecasts.forEach(item => {
        const date = new Date(item.dt_txt);
        forecastHTML += `
          <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
            <strong>${date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</strong><br>
            ${item.weather[0].description}<br>
            🌡️ ${item.main.temp}°C<br>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">
          </div>
        `;
      });

      document.getElementById('forecastContainer').innerHTML = forecastHTML;
    });
}
        `;
    } catch (error) {
        resultDiv.innerHTML = "Erro ao buscar dados do clima.";
    }
}
