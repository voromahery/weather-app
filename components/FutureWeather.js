import React from "react";
import { Link } from 'react-router-dom';
import HighlightWeather from "./HighlightWeather";

export default function FutureWeather() {
  return (
    <div>
      <div className="future-weather">
        <div className="convertButton">
          <button>&deg;C</button>
          <button>&deg;F</button>
        </div>
        <div className="future-forecast">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {" "}
              {dataByWoeid.map((data, index) => (
                <div className="next-forecast" key={data.id}>
                  <Link to="/">
                    <div>
                      <p>{data.applicable_date}</p>
                      <img
                        src={`/static/img/weather/${data.weather_state_abbr}.svg`}
                        alt=""
                      />
                      <h3>{Math.round(data.the_temp)} &deg;C</h3>
                      <h3>25 &deg;C</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
