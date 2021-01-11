import React, { useEffect, useReducer } from "react";

const Context = React.createContext();
function ContextProvider(props) {
  const regeneratorRunTime = "https://cors-anywhere.herokuapp.com/";
  const weatherData = `${regeneratorRunTime}https://www.metaweather.com/api/location/search/?query=helsinki`;

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

console.log(state.response);

  return (
    <div>
      <Context.Provider value={""}>{props.children}</Context.Provider>
    </div>
  );
}

export { ContextProvider, Context };
