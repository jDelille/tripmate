import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TripEditor from "./TripEditor";
import UserContext from "../../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../../util/domain";
import Trip from "./Trip";
import "./TripPage.scss";
import Map from "../../Map/Map";

function TripPage() {
  const [trips, setTrips] = useState([]);
  const [tripEditorOpen, setTripEditorOpen] = useState(false);
  const [editTripData, setEditTripData] = useState(null);

  const { user } = useContext(UserContext);

  function clearEditTripData() {
    setEditTripData(null);
  }

  useEffect(() => {
    if (!user) setTrips([]);
    else getTrips();
  }, [user]);

  async function getTrips() {
    const tripRes = await axios.get(`${domain}/trip/`);
    setTrips(tripRes.data);
  }

  function editTrip(tripData) {
    setEditTripData(tripData);
    setTripEditorOpen(true);
  }

  function renderTrips() {
    let sortedTrips = [...trips];
    sortedTrips = sortedTrips.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedTrips.map((trip, i) => {
      return (
        <Trip key={i} trip={trip} getTrips={getTrips} editTrip={editTrip} />
      );
    });
  }

  return (
    <div className="home">
      {!tripEditorOpen && user && (
        <>
          <div className="home-controls">
            <div className="control-bar">
              <button
                className="add-btn"
                onClick={() => setTripEditorOpen(true)}
              >
                Add
              </button>
            </div>
            {trips.length > 0
              ? renderTrips()
              : user && (
                  <p className="no-Trips-msg">
                    You have not added any Trips yet.
                  </p>
                )}
          </div>
          <div className="right">
            <Map />
          </div>
        </>
      )}

      {tripEditorOpen && (
        <TripEditor
          setTripEditorOpen={setTripEditorOpen}
          getTrips={getTrips}
          editTripData={editTripData}
          clearEditTripData={clearEditTripData}
        />
      )}
      {user === null && (
        <div className="home-text">
          <h2> Welcome to Shmagity </h2>
          <p> Save lines of code to reuse in your projects. </p>
          <p>Free to use. Just create an account and start saving some code!</p>
          <Link to="/register" className="register-link-home">
            Register Here
          </Link>
        </div>
      )}
    </div>
  );
}

export default TripPage;
