import React from "react";
import axios from "axios";
import domain from "../../../util/domain";
import "./Trip.scss";

function Trip({ trip, getTrips, editTrip }) {
  async function deleteTrip() {
    if (window.confirm("Do you want to delete this trip?"))
      await axios.delete(`${domain}/trip/${trip._id}`);

    getTrips();
  }
  return (
    <div className="trip">
      {trip.tripName && (
        <h2 className="title">
          <span>Title: </span>
          <br />
          {trip.tripName}
        </h2>
      )}
      {trip.destination && (
        <h2 className="destination">
          <span>Destination: </span> <br /> {trip.destination}
        </h2>
      )}
      {trip.tripmates && (
        <p className="tripmates">
          <span>Tripmates: </span> <br />
          {trip.tripmates}
        </p>
      )}
      {trip.notes && (
        <h2 className="notes">
          <span>Notes: </span> <br />
          {trip.notes}
        </h2>
      )}

      {trip.attractions && (
        <h2 className="attractions">
          <span>Attractions: </span> <br />
          {trip.attractions}
        </h2>
      )}
      {trip.budget && (
        <h2 className="budet">
          <span>Budget: </span> <br />
          {trip.budget}
        </h2>
      )}
      {trip.expenses && (
        <h2 className="expenses">
          <span>Expenses: </span> <br />
          {trip.expenses.item}
          {trip.expenses.cost}
        </h2>
      )}

      <button className="edit-btn" onClick={() => editTrip(trip)}>
        Edit
      </button>
      <button className="delete-btn" onClick={deleteTrip}>
        Delete
      </button>
    </div>
  );
}

export default Trip;
