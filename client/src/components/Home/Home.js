import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import domain from "../../util/domain";
// import Map from "../Trip/Map";

function Home() {
  const { user, getUser } = useContext(UserContext);
  console.log(user);

  const history = useHistory();

  async function logOut() {
    await axios.get(`${domain}/auth/logOut`);
    await getUser();
    history.push("/");
  }

  return (
    <div className="home">
      <div className="wave-side">
        <div className="title">
          <h1> Plan your next trip </h1>
          <p> Organize your trip details and expenses. </p>
        </div>
        <div className="content">
          <div className="links">
            {user === null ? (
              <>
                <Link to="/login" className="link">
                  Login
                </Link>
                <Link to="/register" className="link">
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="logout" onClick={logOut}>
                Log out
              </button>
            )}
          </div>
          {user === null ? (
            ""
          ) : (
            <Link className="new-trip" to="/createTrip">
              New Trip
            </Link>
          )}
        </div>
      </div>
      <div className="map-side">{/* <Map /> */}</div>
    </div>
  );
}
export default Home;
