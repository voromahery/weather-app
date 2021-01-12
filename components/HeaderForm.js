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

  return (
    <div>
      <div>
        <button>Seach for places</button>
      </div>
      <img
        src={`/static/img/weather/${dataByWoeid.weather_state_abbr}.svg`}
        alt=""
      />
      <h3>{dataByWoeid.the_temp} &deg;C</h3>
      <p>{dataByWoeid.weather_state_name}</p>
      <p>{dataByWoeid.created}</p>
      <p>{city}</p>
    </div>
  );
}

export default HeaderForm;
