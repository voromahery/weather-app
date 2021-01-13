import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../ContextProvider";
import locationIcon from "../icons/location.svg";
import dateToDisplay from "./dateToDisplay";
import FutureWeather from "./FutureWeather";
import SearchForm from "./SearchForm";
import TodayWeather from "./TodayWeather";

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
      setCity("Nairobi");
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
        <h1 className="loading">Loading...</h1>
      ) : (
        <div className="today">
          <Link to="/">
            <TodayWeather
              converted={converted}
              todayWeather={todayWeather}
              dataByCity={dataByCity}
              dateToDisplay={dateToDisplay}
            />
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
            <h2 className="loading">Loading...</h2>
          ) : (
            <>
              {dataByWoeid.map((data, index) => {
                return (
                  <Link to={`/highlight/${data.id}`} key={data.id}>
                    <FutureWeather
                      data={data}
                      index={index}
                      converted={converted}
                    />
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
