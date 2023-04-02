const API_KEY = "1725113cada447182b206e01eaa2f4cc";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C\n`;
      city.innerText = data.name;
    });
  console.log(`lat: ${lat}, lng: ${lon}`);
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//https://api.openweathermap.org/data/2.5/weather?lat=35.8806693&lon=128.6215081&appid=1725113cada447182b206e01eaa2f4cc
