import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./components/Home/Home";
import TripEditor from "./components/Home/Trip/TripEditor";
import TripPage from "./components/Home/Trip/TripPage";
// import CreateTrip from "./components/Trip/CreateTrip";
// import Trip from "./components/Trip/Trip";
function Router() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/createTrip">
          <TripPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;