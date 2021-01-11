import React, { useEffect, useReducer, useState } from "react";

const Context = React.createContext();
function ContextProvider(props) {
  const regeneratorRunTime = "https://cors-anywhere.herokuapp.com/";

  const date = Date.now();
  const dateNow = new Date(date);
  let yyyy = dateNow.getFullYear().toString();
  let mm = (dateNow.getMonth() + 1).toString();
  let dd = dateNow.getDate().toString();
  const fullDate = `${yyyy}/${mm}/${dd}`;

  const [city, setCity] = useState("Helsinki");
  const [location, setLocation] = useState("565346");

  const searchByCity = `${regeneratorRunTime}https://www.metaweather.com/api/location/search/?query=${city}`;

  const weatherData = `${regeneratorRunTime}https://www.metaweather.com/api/location/${location}/${fullDate}`;

  const image = `null`;
  const staticImage = `/static/img/weather/${image}.svg`;

  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOADING": {
          return { ...state, loading: true };
        }
        case "RESOLVED": {
          return {
            ...state,
            loading: false,
            response: action.response,
            error: null,
          };
        }
        case "ERROR": {
          return {
            ...state,
            loading: false,
            response: null,
            error: action.error,
          };
        }
      }
    },
    {
      loading: false,
      response: [],
      error: null,
    }
  );

  const dataWoeid = state.response.map((data) => data.woeid);
  dataWoeid.length = 1;

  useEffect(() => {
    let isCurrent = true;
    dispatch({ type: "LOADING" });
    fetch(searchByCity)
      .then((response) => response.json())
      .then((json) => {
        if (isCurrent) {
          dispatch({ type: "RESOLVED", response: json });
        }
      })
      .catch((error) => {
        dispatch({ type: "ERROR", error });
      });

    setLocation(dataWoeid);

    return () => {
      isCurrent = false;
    };
  }, [city]);

  console.log(state.response, city);

  console.log(location);

  return (
    <div>
      <Context.Provider value={{ state, dispatch, city }}>
        {props.children}
      </Context.Provider>
    </div>
  );
}

export { ContextProvider, Context };
