import React, { useContext, useState } from "react";
import { getIconUrl } from "metaweather-ts";
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
  } = useContext(Context);

const [isSearch, setIsSearch] = useState(false);

function openSearch() {
  setIsSearch(!isSearch);
}

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
        {/* <input type="text" onChange={searchCity} /> */}
        {isSearch && <SearchForm searchCity={searchCity} />}
      </div>
      <div className="">
        <img
          src={`/static/img/weather/${dataByWoeid.weather_state_abbr}.svg`}
          alt=""
        />
        <h3>{Math.round(dataByWoeid.the_temp)} &deg;C</h3>
        <p>{dataByWoeid.weather_state_name}</p>
        <p>{DateFormat(new Date())}</p>
        <p>{dataByCity.title || "Helsinki"}</p>
      </div>
      <div className="future-weather">
        <div>
          <p>{DateFormat(new Date())}</p>
          <img
            src={`/static/img/weather/${dataByWoeid.weather_state_abbr}.svg`}
            alt=""
          />
          <h3>{Math.round(dataByWoeid.the_temp)} &deg;C</h3>
          <h3>25 &deg;C</h3>
        </div>
      </div>
    </div>
  );
}

export default HeaderForm;
