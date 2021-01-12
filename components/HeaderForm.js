import React, { useContext } from "react";
import { getIconUrl } from "metaweather-ts";
import { Context } from "../ContextProvider";
import DateFormat from './DateFormat';

function HeaderForm() {
  const {
    city,
    setCity,
    dataByCity,
    dataByWoeid,
    location,
    setLocation,
  } = useContext(Context);

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
        <button>Seach for places</button>
        <input type="text" onChange={searchCity} />
      </div>
      <div className="">
        <img
          src={`/static/img/weather/${dataByWoeid.weather_state_abbr}.svg`}
          alt=""
        />
        <h3>{dataByWoeid.the_temp} &deg;C</h3>
        <p>{dataByWoeid.weather_state_name}</p>
        <p>{DateFormat(new Date())}</p>
        <p>{dataByCity.title || "Helsinki"}</p>
      </div>
      <div className="future-weather">
        <div>
          <p>Date</p>
          <img
          src={`/static/img/weather/${dataByWoeid.weather_state_abbr}.svg`}
          alt=""
        />
        <h3>{dataByWoeid.the_temp} &deg;C</h3>
        <h3>25 &deg;C</h3>
        </div>
      </div>
    </div>
  );
}

export default HeaderForm;
