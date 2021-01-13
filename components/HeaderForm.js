import React, { useContext, useState, useEffect } from "react";
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
              <p className="today-date">{todayWeather.applicable_date}</p>
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
              {dataByWoeid.map((data) => {
                return (
                  <Link to={`/highlight/${data.id}`} key={data.id}>
                    <div className="next-forecast">
                      <div>
                        <p>{data.applicable_date}</p>
                        <img
                          src={`/static/img/weather/${data.weather_state_abbr}.svg`}
                          alt=""
                        />
                        <h3>
                          {converted ? (
                            <span>{`${Math.round(
                              data.the_temp * (9 / 5) + 32
                            )} °F`}</span>
                          ) : (
                            <span>{`${Math.round(data.the_temp)} °C`}</span>
                          )}
                        </h3>
                        <h3>
                          {" "}
                          {converted ? (
                            <span>{`${25 * (9 / 5) + 32} °F`}</span>
                          ) : (
                            <span>{`${25} °C`}</span>
                          )}
                        </h3>
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
