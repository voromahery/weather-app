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

  const [city, setCity] = useState("Helsinki");
  const [location, setLocation] = useState("565346");

  const searchByCity = `${regeneratorRunTime}https://www.metaweather.com/api/location/search/?query=${city}`;

  const weatherData = `${regeneratorRunTime}https://www.metaweather.com/api/location/${location}/${fullDate}`;

  async function dataFetchCity() {
    const responseCity = await fetch(searchByCity);
    const dataCity = await responseCity.json();
    dataCity.length = 1;
    setDataByCity(dataCity[0]);
  }

  async function dataFetchId() {
    const responseId = await fetch(weatherData);
    const dataId = await responseId.json();
    dataId.length = 1;
    setDataByWoeid(dataId[0]);
  }

  useEffect(() => {
    setLocation(dataByCity.woeid);
    dataFetchCity();
  }, [city]);

  useEffect(() => {
    dataFetchId();
  }, [dataByCity]);


  console.log(location, dataByCity, dataByWoeid, city);

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
        }}
      >
        {props.children}
      </Context.Provider>
    </div>
  );
}

export { ContextProvider, Context };
