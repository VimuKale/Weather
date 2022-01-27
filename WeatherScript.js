const apiKey = "90c72f83f12348c997f0aec59a31634f";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), {
    origin: "cros",
  });
  const respData = await resp.json();
  addWeatherToPage(respData,city);
}

function addWeatherToPage(data,cityy) {
  console.log(data);
  console.log(data.weather[0].icon);

  const temp = Ktoc(data.main.temp);
  const feels = Kfeel(data.main.feels_like);

  let today = new Date().toString();

  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `  
      <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /><br>${cityy} <br> ${temp}°C <br> ${data.weather[0].main} <br> Feels Like ${feels}°C <br> Humidity is ${data.main.humidity}% <br><br> ${today}</h2>
      `;
  //  cleanup
  main.innerHTML = "";

  main.appendChild(weather);

  if (data.weather[0].main === "Clear") {
    document.getElementsByClassName("weather")[0].style.backgroundImage = "url('./WeatherImages/ClearSky.jpg')";
  }

  if (data.weather[0].main === "Clear" && data.weather[0].icon === "01n") {
    document.getElementsByClassName("weather")[0].style.backgroundImage ="url('./WeatherImages/ClearSkyNight.jpg')";
    document.getElementsByClassName("weather")[0].children[0].style.color="white";
  }

  if (data.weather[0].main === "Clouds") {
    document.getElementsByClassName("weather")[0].style.backgroundImage = "url('./WeatherImages/Clouds.jpg')";
    document.getElementsByClassName("weather")[0].children[0].style.color="white";
  }

  if (data.weather[0].main === "Drizzle") {
    document.getElementsByClassName("weather")[0].style.backgroundImage ="url('./WeatherImages/ShowerRain.jpg')";
  }

  if (data.weather[0].main === "Rain") {
    document.getElementsByClassName("weather")[0].style.backgroundImage ="url('./WeatherImages/Rain.jpg')";
  }

  if (data.weather[0].main === "Thunderstorm") {
    document.getElementsByClassName("weather")[0].style.backgroundImage = "url('./WeatherImages/Thunderstorm.jpg')";
  }

  if (data.weather[0].main === "Snow") {
    document.getElementsByClassName("weather")[0].style.backgroundImage ="url('./WeatherImages/Snow.jpg')";
  }

  if (data.weather[0].main === "Mist" ||
  data.weather[0].main === "Smoke" ||
  data.weather[0].main === "Haze" ||
  data.weather[0].main === "Dust" ||
  data.weather[0].main === "Fog" ||
  data.weather[0].main === "Sand" ||
  data.weather[0].main === "Ash" ||
  data.weather[0].main === "Squall" ||
  data.weather[0].main === "Tornado"
  ) {
    document.getElementsByClassName("weather")[0].style.backgroundImage ="url('./WeatherImages/Mist.jpg')";
  }

  document.getElementsByClassName("weather")[0].style.backgroundSize = "cover";
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

function Kfeel(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
});
