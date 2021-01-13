import React from "react";
import dateToDisplay from './dateToDisplay';

export default function FutureWeather({data, index, converted}) {
  return (
    <div className="next-forecast">
      <p className="future-date">{index === 0 ? "Tomorrow" : dateToDisplay(data.applicable_date)}</p>
      <img
        src={`https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`}
        alt=""
        className="future-icon"
      />
      <div className="future-temperature">
        {converted ? (
          <span className="future-temperature">{`${Math.round(data.the_temp * (9 / 5) + 32)} °F`}</span>
        ) : (
          <span className="future-temperature">{`${Math.round(data.the_temp)} °C`}</span>
        )}
        {converted ? (
          <span className="max-temp">{`${Math.round(data.max_temp * (9 / 5) + 32)} °F`}</span>
        ) : (
          <span className="max-temp">{`${Math.round(data.max_temp)} °C`}</span>
        )}
      </div>
    </div>
  );
}
