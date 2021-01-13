import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../ContextProvider";
import DateFormat from "./DateFormat";
import HighlightWeather from "./HighlightWeather";
import SearchForm from "./SearchForm";

function HeaderForm() {
  const {
    city,
    setCity,
    dataByCity,
    dataByWoeid,
    location,
    setLocation,
    isLoading,
    setIsLoading,
    todayWeather,
  } = useContext(Context);

  const [isSearch, setIsSearch] = useState(false);
  const [degree, setDegree] = useState(0);

  function openSearch() {
    setIsSearch(!isSearch);
  }

  // function convertDegree() {

  // }

  function searchCity(e) {
    if (e.currentTarget.value !== "") {
      setCity(e.currentTarget.value);
    }
    if (e.currentTarget.value === "") {
      setCity("Helsinki");
    }
  }

  return (
    <div>
      <div>
        <button onClick={openSearch}>Seach for places</button>
        {isSearch && <SearchForm searchCity={searchCity} />}
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="today">
          <Link to="/">
            <div>
              <img
                src={`/static/img/weather/${todayWeather.weather_state_abbr}.svg`}
                alt=""
              />
              <h3 className="temperature">
                <span className="today-degree">
                  {Math.round(todayWeather.the_temp)}
                </span>
                <span className="today-degree-sign">&deg;C</span>
              </h3>
              <p className="today-weather-state">
                {todayWeather.weather_state_name}
              </p>
              <p className="today-date">{todayWeather.applicable_date}</p>
              <p className="location">{dataByCity.title || "Helsinki"}</p>
            </div>
          </Link>
        </div>
      )}
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
              {dataByWoeid.map((data) => (
                <Link to={`/highlight/${data.id}`} key={(data.id)}>
                  <div className="next-forecast">
                    <div>
                      <p>{data.applicable_date}</p>
                      <img
                        src={`/static/img/weather/${data.weather_state_abbr}.svg`}
                        alt=""
                      />
                      <h3>{Math.round(data.the_temp)} &deg;C</h3>
                      <h3>25 &deg;C</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderForm;
