import React, { useContext } from "react";
import { getIconUrl } from "metaweather-ts";
import { Context } from "../ContextProvider";

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
    setCity(e.currentTarget.value);
  }

  return (
    <div>
      <div>
        <button>Seach for places</button>
        <input type="text" onChange={searchCity} />
      </div>
      <img
        src={`/static/img/weather/${dataByWoeid.weather_state_abbr}.svg`}
        alt=""
      />
      <h3>{dataByWoeid.the_temp} &deg;C</h3>
      <p>{dataByWoeid.weather_state_name}</p>
      <p>{dataByWoeid.created}</p>
      <p>{dataByCity.title}</p>
    </div>
  );
}

export default HeaderForm;
