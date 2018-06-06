import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import LeagueHome from "../pages/LeagueHome";
import "semantic-ui-css/semantic.min.css";
import "./app.styles.js";

const App = () => (
  <Switch>
    <Route exact path="/" component={LeagueHome} />
  </Switch>
);

export default App;
