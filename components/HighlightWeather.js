import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../ContextProvider.js";
export default function HighlightWeather() {
  const {
    dataByWoeid,
    todayWeather,
    isLoading,
  } = useContext(Context);

  const { weatherId } = useParams();
  const findWeather =
    dataByWoeid.find(
      (data) =>
        data.id === Number(weatherId) || todayWeather.id === Number(weatherId)
    ) || "";

  return (
    <div className="highlight">
      {isLoading ? (
        <h3 className="loading">Loading</h3>
      ) : (
        <>
          <h2 className="highlight-title">Today’s Hightlights </h2>
          <ul className="highlight-list">
            <li className="highlight-list-item">
              <div className="status-name">Wind status</div>
              <div className="status-value">
                {Math.round(findWeather.wind_speed) ||
                  Math.round(todayWeather.wind_speed)}
                <span className="unit">mph</span>
              </div>
              <div className="compass">
                {findWeather.wind_direction_compass ||
                  todayWeather.wind_direction_compass}
              </div>
            </li>
            <li className="highlight-list-item">
              <div className="status-name">Humidity</div>
              <div className="status-value">
                {findWeather.humidity || todayWeather.humidity}
                <span className="unit">%</span>
              </div>
              <progress
                min="0"
                max="100"
                value={findWeather.humidity || todayWeather.humidity}
              ></progress>
            </li>
            <li className="highlight-list-item">
              <div className="status-name">Visibility</div>
              <div className="status-value">
                {Math.round(findWeather.visibility) ||
                  Math.round(todayWeather.visibility)}
                <span className="unit">miles</span>
              </div>
            </li>
            <li className="highlight-list-item">
              <div className="status-name">Air Pressure</div>
              <div className="status-value">
                {Math.round(findWeather.air_pressure) ||
                  Math.round(todayWeather.air_pressure)}
                <span className="unit">mb</span>
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
