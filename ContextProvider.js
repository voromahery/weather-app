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


  const [city, setCity] = useState('helsinki');
  const [location, setLocation] = useState('565346');

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

  useEffect(() => {
    let isCurrent = true;
    dispatch({ type: "LOADING" });
    fetch(weatherData)
      .then((response) => response.json())
      .then((json) => {
        if (isCurrent) {
          dispatch({ type: "RESOLVED", response: json });
        }
      })
      .catch((error) => {
        dispatch({ type: "ERROR", error });
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  console.log(state.response[0], city);

  return (
    <div>
      <Context.Provider value={{ state, dispatch }}>
        {props.children}
      </Context.Provider>
    </div>
  );
}

export { ContextProvider, Context };
