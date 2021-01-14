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
    dataByWoeid,
    location,
    setLocation,
    isLoading,
    setIsLoading,
    todayWeather,
    searchTitle,
    setSearchTitle,
    dataByCity,
    setDataByCity,
  } = useContext(Context);

  const [isSearch, setIsSearch] = useState(false);
  const [converted, setConverted] = useState(false);

  // Toggle the search form
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

  return (
    <div>
      <div className="search-wrapper">
        <button onClick={openSearch} className="search-toggle">
          Seach for places
        </button>
        <img src={locationIcon} alt="" className="location-icon" />
      </div>
      {isSearch && (
        <SearchForm
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          dataByCity={dataByCity}
          setDataByCity={setDataByCity}
          setCity={setCity}
          setIsSearch={setIsSearch}
          isSearch={isSearch}
        />
      )}
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
          <button onClick={convertDegreeC} className="toCelcius">&deg;C</button>
          <button onClick={convertDegreeF} className="toFarenheit">&deg;F</button>
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
