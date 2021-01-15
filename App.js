import React from "react";
import { Switch, Route } from "react-router-dom";
import FutureWeather from "./components/FutureWeather";
import HeaderForm from "./components/HeaderForm";
import HighlightWeather from "./components/HighlightWeather";

function App() {
  return (
    <div>
      <div div className="container">
        <Switch>
          <Route exact path="/">
            <HeaderForm />
            <div>
              <FutureWeather />
              <HighlightWeather />
            </div>
          </Route>
          <Route path="/highlight/:weatherId">
            <HeaderForm />
            <div>
              <FutureWeather />
              <HighlightWeather />
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
