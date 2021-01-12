import React, { useEffect, useState } from "react";

const Context = React.createContext();
function ContextProvider(props) {
  const regeneratorRunTime = "https://cors-anywhere.herokuapp.com/";

  const date = Date.now();
  const dateNow = new Date(date);
  let yyyy = dateNow.getFullYear().toString();
  let mm = (dateNow.getMonth() + 1).toString();
  let dd = dateNow.getDate().toString();
  const fullDate = `${yyyy}/${mm}/${dd}`;

  const [dataByCity, setDataByCity] = useState([]);
  const [dataByWoeid, setDataByWoeid] = useState([]);
  const [consolidatedWeather, setConsolidatedWeather] = useState([]);
  const [todayWeather, setTodayWeather] = useState("");

  const [city, setCity] = useState("Helsinki");
  const [location, setLocation] = useState("565346");
  const [isLoading, setIsLoading] = useState(false);

  const searchByCity = `${regeneratorRunTime}https://www.metaweather.com/api/location/search/?query=${city}`;

  const weatherData = `${regeneratorRunTime}https://www.metaweather.com/api/location/${location}/`;

  async function dataFetchCity() {
    const responseCity = await fetch(searchByCity);
    const dataCity = await responseCity.json();
    dataCity.length = 1;
    setDataByCity(dataCity[0]);
  }

  async function dataFetchId() {
    setIsLoading(true);
    const responseId = await fetch(weatherData);
    const dataId = await responseId.json();
    dataId.length = 1;
    setTodayWeather(dataId.consolidated_weather[0]);
    setDataByWoeid(dataId.consolidated_weather);
    setIsLoading(false)
  }

  useEffect(() => {
    setLocation(dataByCity.woeid);
    dataFetchCity();
  }, [city]);

  useEffect(() => {
    dataFetchId();
  }, [dataByCity]);


  console.log(dataByWoeid.slice(1,6));

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
          todayWeather
        }}
      >
        {props.children}
      </Context.Provider>
    </div>
  );
}

export { ContextProvider, Context };
