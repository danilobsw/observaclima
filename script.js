
async function getWeather() {
    const apiKey = "70e80e5b94f159cd3fbfb249840be579";
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResult");

    if (!city) {
        resultDiv.innerHTML = "Por favor, digite uma cidade.";
        return;
    }

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`
        );
        const data = await res.json();

        if (data.cod !== 200) {
            resultDiv.innerHTML = "Cidade não encontrada.";
            return;
        }

        const desc = data.weather[0].description;
        const temp = data.main.temp;
        const wind = data.wind.speed;
        const humidity = data.main.humidity;

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
