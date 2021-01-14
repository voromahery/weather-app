import React from "react";
import { Switch, Route } from "react-router-dom";
import HeaderForm from "./components/HeaderForm";
import HighlightWeather from "./components/HighlightWeather";

function App() {
  return (
    <div>
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
