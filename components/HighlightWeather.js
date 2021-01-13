import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../ContextProvider.js";
export default function HighlightWeather() {
  const { city, setCity, dataByCity, dataByWoeid, todayWeather, isLoading } = useContext(
    Context
  );

  const { weatherId } = useParams();
  const findWeather =
    dataByWoeid.find(
      (data) =>
        data.id === Number(weatherId) || todayWeather.id === Number(weatherId)
    ) || "";

  console.log(findWeather, weatherId, "FOUND");

  return (
    <div>
      {isLoading ? (
        <h3 className="loading">Loading</h3>
      ) : (
        <>
          <h2>Today’s Hightlights </h2>
          <ul>
            <li>
              <div>Wind status</div>
              <div>{Math.round(findWeather.wind_speed) || Math.round(todayWeather.wind_speed)}mph</div>
              <div>
                {findWeather.wind_direction_compass ||
                  todayWeather.wind_direction_compass}
              </div>
            </li>
            <li>
              <div>Humidity</div>
              <div>{findWeather.humidity || todayWeather.humidity}%</div>
              <progress
                min="0"
                max="100"
                value={findWeather.humidity || todayWeather.humidity}
              ></progress>
            </li>
            <li>
              <div>Visibility</div>
              <div>
                {findWeather.visibility || todayWeather.visibility} miles
              </div>
            </li>
            <li>
              <div>Air Pressure</div>
              <div>{findWeather.air_pressure || todayWeather.air_pressure}</div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
