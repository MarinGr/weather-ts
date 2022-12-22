import React from "react";
import { WeatherItem } from "../types/index";

type Props = {
  weatherData: WeatherItem;
  errorMessageDisplay: boolean;
  location: string;
  date: string;
};

export default function WeatherInfo(props: Props): JSX.Element {
  const { icon, temperature, description, wind, humidity, pressure } =
    props.weatherData;

  return (
    <div className="weather-container">
      {props.errorMessageDisplay && (
        <div className="error-message">City not found. Please try again</div>
      )}
      {props.location && (
        <div className="location">
          <i className="fa-solid fa-location-dot"></i>
          {props.location}
        </div>
      )}
      <div className="date">{props.date}</div>
      {icon && (
        <div className="weather-icon-container">
          <img className="weather-icon" src={icon} alt="Weather Icon" />
        </div>
      )}

      <div className="temperature">
        <span className="temperature-num">
          {temperature ? temperature : "—"}
        </span>
      </div>
      <div className="description">{description}</div>
      <div className="details">
        <div className="details-column wind">
          <i className="fa-solid fa-wind"></i>
          <p className="wind-num">{wind ? wind : "—"}</p>
          <p className="details-desc">Wind</p>
        </div>
        <div className="details-column humidity">
          <i className="fa-solid fa-droplet"></i>
          <p className="humidity-num">{humidity ? humidity : "—"}</p>
          <p className="details-desc">Humidity</p>
        </div>
        <div className="details-column pressure">
          <i className="fa-solid fa-gauge-high"></i>
          <p className="pressure-num">{pressure ? pressure : "—"}</p>
          <p className="details-desc">Pressure</p>
        </div>
      </div>
    </div>
  );
}
