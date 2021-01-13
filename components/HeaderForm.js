import React, { useContext, useState, useEffect } from "react";
import locationIcon from '../icons/location.svg';
import { Link } from "react-router-dom";
import { Context } from "../ContextProvider";
import dateToDisplay from "./dateToDisplay";
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

  const [degree, setDegree] = useState(todayWeather.the_temp);
  const [converted, setConverted] = useState(false);
  function openSearch() {
    setIsSearch(!isSearch);
  }

  // Converting the degree
  function convertDegreeC() {
    setConverted(false);
  }

  function convertDegreeF() {
    setConverted(true);
  }

  console.log(degree, "DEGREE");

  // Searching by city name
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
      <div className="search-wrapper">
        <button onClick={openSearch} className="search-toggle">
          Seach for places
        </button>
        <img src={locationIcon} alt="" className="location-icon" />
        {isSearch && <SearchForm searchCity={searchCity} />}
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="today">
          <Link to="/">
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
              <p className="today-weather-state">
                {todayWeather.weather_state_name}
              </p>
              <p className="today-date">
                Today . {dateToDisplay(todayWeather.applicable_date)}
              </p>
              <p className="location">{dataByCity.title || "Helsinki"}</p>
            </div>
          </Link>
        </div>
      )}
      <div className="future-weather">
        <div className="convertButton">
          <button onClick={convertDegreeC}>&deg;C</button>
          <button onClick={convertDegreeF}>&deg;F</button>
        </div>
        <div className="future-forecast">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {dataByWoeid.map((data, index) => {
                return (
                  <Link to={`/highlight/${data.id}`} key={data.id}>
                    <div className="next-forecast">
                      <p>
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
                          <span>{`${Math.round(
                            data.the_temp * (9 / 5) + 32
                          )} °F`}</span>
                        ) : (
                          <span>{`${Math.round(data.the_temp)} °C`}</span>
                        )}
                        {converted ? (
                          <span>{`${Math.round(
                            data.max_temp * (9 / 5) + 32
                          )} °F`}</span>
                        ) : (
                          <span>{`${Math.round(data.max_temp)} °C`}</span>
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
    </div>
  );
}

export default HeaderForm;
