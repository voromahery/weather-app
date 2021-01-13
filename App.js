import React from "react";
import { Switch, Route } from "react-router-dom";
import HeaderForm from "./components/HeaderForm";
import HighlightWeather from "./components/HighlightWeather";

function App() {
  return (
    <div>
      {/* <h1>Onja Weather App</h1> */}
      <div>
        <Switch>
          <Route exact path="/">
            <HeaderForm />
            <HighlightWeather />
          </Route>
          <Route path="/highlight/:weatherId">
            <HeaderForm />
            <HighlightWeather />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
