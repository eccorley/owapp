import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import LeagueHome from "../leagueHome";
import TeamPage from "../teamPage";
import NewsPage from "../newsPage";
import "semantic-ui-css/semantic.min.css";
import "./app.styles.js";

const App = () => (
  <Switch>
    <Route exact path="/" component={LeagueHome} />
    <Route exact path="/news" component={NewsPage} />
    <Route exact path="/teams/:teamId" component={TeamPage} />
  </Switch>
);

export default App;
