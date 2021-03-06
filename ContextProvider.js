import React, { useEffect, useState } from "react";

const Context = React.createContext();
function ContextProvider(props) {
  const regeneratorRunTime = "https://cors-anywhere.herokuapp.com/";

  const [searchTitle, setSearchTitle] = useState([]);
  const [dataByCity, setDataByCity] = useState([]);
  const [dataByWoeid, setDataByWoeid] = useState([]);
  const [todayWeather, setTodayWeather] = useState("");

  const [city, setCity] = useState("Nairobi");
  const [location, setLocation] = useState("1528488");
  const [isLoading, setIsLoading] = useState(false);
  const [converted, setConverted] = useState(false);

  const searchByCity = `${regeneratorRunTime}https://www.metaweather.com/api/location/search/?query=${city}`;

  const weatherData = `${regeneratorRunTime}https://www.metaweather.com/api/location/${location}/`;

  async function dataFetchCity() {
    const responseCity = await fetch(searchByCity);
    const dataCity = await responseCity.json();
    setDataByCity(dataCity[0]);
    setSearchTitle(dataCity);
  }

  async function dataFetchId() {
    setIsLoading(true);

    const responseId = await fetch(weatherData);
    const dataId = await responseId.json();

    setTodayWeather(dataId.consolidated_weather[0]);
    setDataByWoeid(dataId.consolidated_weather.slice(1, 6));
    setIsLoading(false);
  }

  useEffect(() => {
    setLocation(dataByCity.woeid);
    dataFetchCity();
  }, [city]);

  useEffect(() => {
    dataFetchId();
  }, [dataByCity]);

  // Converting the degree
  function convertDegreeC() {
    setConverted(false);
  }

  function convertDegreeF() {
    setConverted(true);
  }

  return (
    <div>
      <Context.Provider
        value={{
          city,
          setCity,
          dataByCity,
          dataByWoeid,
          location,
          setLocation,
          isLoading,
          setIsLoading,
          todayWeather,
          searchTitle,
          setSearchTitle,
          converted,
          setConverted,
          convertDegreeC,
          convertDegreeF,
        }}
      >
        {props.children}
      </Context.Provider>
    </div>
  );
}

export { ContextProvider, Context };
