import React, { useContext, useState } from "react";
import { Context } from "../ContextProvider";
import DateFormat from "./DateFormat";
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
        <div className="">
          <div>
            <img
              src={`/static/img/weather/${todayWeather.weather_state_abbr}.svg`}
              alt=""
            />
            <h3>{Math.round(todayWeather.the_temp)} &deg;C</h3>
            <p>{todayWeather.weather_state_name}</p>
            <p>{todayWeather.applicable_date}</p>
            <p>{dataByCity.title || "Helsinki"}</p>
          </div>
        </div>
      )}
      <div className="future-weather">
        <div className="convertButton">
          <button>&deg;C</button>
          <button>&deg;F</button>
        </div>
        {dataByWoeid.map((data) => (
          <div>
            <p>{data.applicable_date}</p>
            <img
              src={`/static/img/weather/${data.weather_state_abbr}.svg`}
              alt=""
            />
            <h3>{Math.round(data.the_temp)} &deg;C</h3>
            <h3>25 &deg;C</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderForm;
