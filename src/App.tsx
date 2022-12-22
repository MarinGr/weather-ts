import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import WeatherInfo from "./components/WeatherInfo";
import { WeatherData, WeatherItem } from "./types/index";

function App() {
  const [location, setLocation] = useState<string>("");
  const [errorMessageDisplay, setErrorMessageDisplay] =
    useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherItem>({
    icon: "",
    temperature: "",
    description: "",
    wind: "",
    humidity: "",
    pressure: "",
  });
  let api;

  useEffect(() => {
    getDate();
    getWeatherByGeolocation();
  }, []);

  useEffect(() => {
    getWeatherByCity(city);
  }, [city]);

  function getDate() {
    const today = new Date();
    const weekday = today.toLocaleString("en", { weekday: "long" });
    const day = today.getDate();
    const month = today.toLocaleString("en", { month: "long" });
    const currentDate = `${weekday} ${day} ${month}`;
    setDate(currentDate);
  }

  function getWeatherByGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }

    function success(position: GeolocationPosition) {
      const { latitude, longitude } = position.coords;
      api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`;
      fetchWeatherData(api);
    }
  }

  function getWeatherByCity(city: string) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
    fetchWeatherData(api);
  }

  function fetchWeatherData(api: string) {
    fetch(api)
      .then((res) => res.json())
      .then((data) => displayWeather(data));
  }

  function displayWeather(data: WeatherData) {
    const kelvin = 273;
    checkFor404(data);
    setWeatherData({
      icon: `./images/${data.weather[0].icon}.png`,
      temperature: `${Math.floor(data.main.temp - kelvin)} °C`,
      description: capitalizeFirstLetter(data.weather[0].description),
      wind: `${data.wind.speed} m/s`,
      humidity: `${data.main.humidity} %`,
      pressure: `${data.main.pressure} hPa`,
    });
    setLocation(`${data.name}, ${data.sys.country}`);
  }

  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  function checkFor404(data: WeatherData) {
    if (data.cod === "404") {
      resetData();
      setErrorMessageDisplay(true);
    } else {
      setErrorMessageDisplay(false);
    }
  }

  function resetData() {
    setWeatherData({
      icon: "",
      temperature: "",
      description: "",
      wind: "",
      humidity: "",
      pressure: "",
    });
    setLocation("");
  }

  return (
    <div className="container">
      <Search setCity={setCity} />
      <WeatherInfo
        date={date}
        location={location}
        weatherData={weatherData}
        errorMessageDisplay={errorMessageDisplay}
      />
    </div>
  );
}

export default App;
