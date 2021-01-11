import React, { useContext } from "react";
import { getIconUrl } from "metaweather-ts";
import { Context } from "../ContextProvider";

function HeaderForm() {
  const { state, city } = useContext(Context);
  const dataWeather = state.response;
  dataWeather.length = 1;
  console.log(dataWeather);

  return (
    <div>
      <div>
        <button>Seach for places</button>
      </div>
      {dataWeather.map((data) => {
        const date = data.created;
        return (
          <div key={data.id}>
            {state.loading && <h1>Loading...</h1>}
            {state.error && <h1 className="error">No data here...😢</h1>}
            {state.response && (
              <>
                <img
                  src={`/static/img/weather/${data.weather_state_abbr}.svg`}
                  alt=""
                />
                <h3>{data.the_temp} &deg;C</h3>
                <p>{data.weather_state_name}</p>
                <p>{date}</p>
              </>
            )}
            <p>{city}</p>
          </div>
        );
      })}
    </div>
  );
}

export default HeaderForm;
