import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../ContextProvider";
import locationIcon from "../icons/location.svg";
import dateToDisplay from "./dateToDisplay";
import FutureWeather from "./FutureWeather";
import SearchForm from "./SearchForm";
import TodayWeather from "./TodayWeather";
import HighlightWeather from "./HighlightWeather";

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
    converted,
    setConverted,
    convertDegreeC,
    convertDegree
  } = useContext(Context);

  const [isSearch, setIsSearch] = useState(false);

  // Toggle the search form
  function openSearch() {
    setIsSearch(!isSearch);
  }

  return (
    <>
      <div className="wrapper">
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
      </div>
    </>
  );
}

export default HeaderForm;
