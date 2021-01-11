import React, { useContext } from "react";
import { Context } from "../ContextProvider";

function HeaderForm() {
  const { state } = useContext(Context);
  const dataWeather = state.response;
  dataWeather.length = 1;
  console.log(dataWeather);

  return (
    <div>
      <div>
        <button>Seach for places</button>
      </div>
      {dataWeather.map((data) => (
        <div key={data.id}>
          <img src={`/static/img/weather/${data.weather_state_abbr}.svg`} alt="" />
          <h3>{data.the_temp} &deg;C</h3>
          <p>Today - {data.weather_state_name}</p>
          <p>{data.created}</p>
          <p>Helsinki</p>
        </div>
      ))}
    </div>
  );
}

export default HeaderForm;
