
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
        `;
    } catch (error) {
        resultDiv.innerHTML = "Erro ao buscar dados do clima.";
    }
}
