import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../ContextProvider";
import dateToDisplay from "./dateToDisplay";

export default function FutureWeather() {
  const {converted, convertDegreeC, convertDegreeF, isLoading, dataByWoeid} = useContext(Context);
  return (
    <div className="future-weather">
      <div className="convertButton">
        <button onClick={convertDegreeC} className="toCelcius">
          &deg;C
        </button>
        <button onClick={convertDegreeF} className="toFarenheit">
          &deg;F
        </button>
      </div>
      <div className="future-forecast">
        {isLoading ? (
          <h2 className="loading">Loading...</h2>
        ) : (
          <>
            {dataByWoeid.map((data, index) => {
              return (
                <Link to={`/highlight/${data.id}`} key={data.id}>
                  <div className="next-forecast">
                    <p className="future-date">
                      {index === 0
                        ? "Tomorrow"
                        : dateToDisplay(data.applicable_date)}
                    </p>
                    <img
                      src={`https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`}
                      alt=""
                      className="future-icon"
                    />
                    <div className="future-temperature">
                      {converted ? (
                        <span className="future-temperature">{`${Math.round(
                          data.min_temp * (9 / 5) + 32
                        )} °F`}</span>
                      ) : (
                        <span className="future-temperature">{`${Math.round(
                          data.min_temp
                        )} °C`}</span>
                      )}
                      {converted ? (
                        <span className="max-temp">{`${Math.round(
                          data.max_temp * (9 / 5) + 32
                        )} °F`}</span>
                      ) : (
                        <span className="max-temp">{`${Math.round(
                          data.max_temp
                        )} °C`}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
