import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../ContextProvider.js";
import compassIcon from "../icons/navigation.svg";
import dateToDisplay from "./dateToDisplay";

export default function HighlightWeather() {
  const { dataByWoeid, todayWeather, isLoading } = useContext(Context);
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
          <h2 className="highlight-title">
            {!findWeather
              ? "Today’s Hightlights"
              : `${dateToDisplay(findWeather.applicable_date)}'s highlights`}
          </h2>
          <ul className="highlight-list">
            <li className="highlight-list-item">
              <div className="status-name">Wind status</div>
              <div className="status-value">
                {Math.round(findWeather.wind_speed) ||
                  Math.round(todayWeather.wind_speed)}
                <span className="unit">mph</span>
              </div>
              <div className="compass">
                <img
                  src={compassIcon}
                  className={`compass-icon compass-${
                    findWeather.wind_direction_compass ||
                    todayWeather.wind_direction_compass
                  }`}
                  alt=""
                />
                <div className="compass-value">
                  {findWeather.wind_direction_compass ||
                    todayWeather.wind_direction_compass}
                </div>
              </div>
            </li>
            <li className="highlight-list-item">
              <div className="status-name">Humidity</div>
              <div className="status-value">
                {findWeather.humidity || todayWeather.humidity}
                <span className="unit">%</span>
              </div>
              <div className="progress-container">
                <div className="possible-value">
                  <span>0</span> <span>50</span> <span>100</span>
                </div>
                <div className="bar-container">
                  <div className="base-bar">
                    <div
                      className="bar-visible"
                      style={{
                        width: `${
                          findWeather.humidity || todayWeather.humidity
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="progress-unit">%</span>
              </div>
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
