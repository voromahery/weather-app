import React from "react";
import placeIcon from "../icons/place.svg";

export default function TodayWeather({
  todayWeather,
  converted,
  dateToDisplay,
  dataByCity
}) {
  return (
    <div className="today-wrapper">
      <img
        src={`https://www.metaweather.com/static/img/weather/${todayWeather.weather_state_abbr}.svg`}
        alt=""
        className="today-icon"
      />
      <h3 className="temperature">
        {converted ? (
          <>
            <span className="today-degree">{`${Math.round(
              todayWeather.the_temp * (9 / 5) + 32
            )}`}</span>
            <span className="today-degree-sign">°F</span>
          </>
        ) : (
          <>
            <span className="today-degree">{`${Math.round(
              todayWeather.the_temp
            )}`}</span>
            <span className="today-degree-sign">°C</span>
          </>
        )}
      </h3>
      <p className="today-weather-state">{todayWeather.weather_state_name}</p>
      <p className="today-date">
        Today . {dateToDisplay(todayWeather.applicable_date)}
      </p>
      <p className="location">
        <img src={placeIcon} alt="" className="place-icon" />{" "}
        {dataByCity.title || "Helsinki"}
      </p>
    </div>
  );
}
