import React, { useState, useEffect } from "react";
import "./TripEditor.scss";
import axios from "axios";
import domain from "../../../util/domain";
import Map from "../../Map/Map";

function TripEditor({
  getTrips,
  setTripEditorOpen,
  editTripData,
  clearEditTripData,
}) {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripmates, setTripmates] = useState([]);
  const [addTripmate, setAddTripmate] = useState("");
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [addAttraction, setAddAttraction] = useState("");
  const [expense, setExpense] = useState([]);
  const [addExpense, setAddExpense] = useState({});
  const [cost, setCost] = useState("");
  const [item, setItem] = useState("");
  const [budget, setBudget] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (editTripData) {
      setTripName(editTripData.tripName ? editTripData.tripName : "");
      setDestination(editTripData.destination ? editTripData.destination : "");
      setTripmates(editTripData.tripmates ? editTripData.tripmates : "");
      setStartDate(editTripData.startDate ? editTripData.startDate : "");
      setEndDate(editTripData.endDate ? editTripData.endDate : "");
      setNotes(editTripData.notes ? editTripData.notes : "");
      setAttractions(editTripData.attractions ? editTripData.attractions : "");
      setBudget(editTripData.budget ? editTripData.budget : "");
      setExpense(editTripData.expense ? editTripData.expense : "");
    }
  }, [editTripData]);

  async function saveTrip(e) {
    e.preventDefault();

    const tripData = {
      tripName: tripName ? tripName : undefined,
      destination: destination ? destination : undefined,
      tripmates: tripmates ? tripmates : undefined,
      startDate: startDate ? startDate : undefined,
      endDate: endDate ? endDate : undefined,
      notes: notes ? notes : undefined,
      attractions: attractions ? attractions : undefined,
      budget: budget ? budget : undefined,
      expenses: expense ? expense : undefined,
    };

    if (!editTripData) {
      await axios.post(`${domain}/trip/`, tripData);
    } else {
      await axios.put(`${domain}/trip/${editTripData._id}`, tripData);
    }
    getTrips();
    closeEditor();
  }

  function closeEditor() {
    setTripEditorOpen(false);
    setTripName("");
    setDestination("");
    setTripmates("");
    setStartDate("");
    setEndDate("");
    setNotes("");
    setAttractions("");
    setBudget("");
    setExpense("");
    clearEditTripData();
  }

  // add tripmates

  async function addTripmates() {
    setTripmates([...tripmates, addTripmate]);
    document.getElementById("tripmate-inpt").value = "";
  }

  // remove tripmate

  function removeTripmate(index) {
    tripmates.splice(index, 1);
    setTripmates([...tripmates]);
  }

  // add notes

  async function addNotes() {
    setNotes([...notes, addNote]);
    document.getElementById("note-inpt").value = "";
  }

  // remove notes

  function removeNote(index) {
    notes.splice(index, 1);
    setNotes([...notes]);
  }

  // add attractions

  async function addAttractions() {
    setAttractions([...attractions, addAttraction]);
    document.getElementById("attraction-inpt").value = "";
  }
  // remove attractions

  function removeAttraction(index) {
    attractions.splice(index, 1);
    setAttractions([...attractions]);
  }

  // add expense

  async function addExpenses() {
    setExpense([...expense, addExpense]);
    document.getElementById("expense-item").value = "";
    document.getElementById("expense-cost").value = "";
  }

  // remove expense

  function removeExpense(index) {
    expense.splice(index, 1);
    setExpense([...expense]);
  }

  // update expense after submit

  useEffect(() => {
    setAddExpense({
      item: item,
      cost: cost,
    });
  }, [cost, item]);

  // expense total

  console.log(expense);

  // subtract expenses from budget

  // let updatedBudget = budget - total;

  const [open, setOpen] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openPlace, setOpenPlace] = useState(false);

  return (
    <div className="add-page">
      <div className="form">
        <div className="control-bar">
          <h1>{tripName}</h1>
        </div>
        <div className="trip-editor">
          <form onSubmit={saveTrip}>
            <div className="trip-info-wrapper">
              <div className="input-wrapper">
                <label htmlFor="tripname"> Trip Name </label>
                <input
                  type="text"
                  id="tripName"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="destination"> Destination </label>
                <input
                  type="text"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            <div className="trip-info-wrapper">
              {!open ? (
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => setOpen(true)}
                >
                  Add Tripmates
                </button>
              ) : open ? (
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
              <div className="input-wrapper">
                <div
                  className={
                    tripmates.length === 0 ? "new-mates" : "new-tripmates"
                  }
                >
                  {open ? (
                    <>
                      <label htmlFor="tripmate"> Tripmates </label>
                      <input
                        type="text"
                        onChange={(e) => setAddTripmate(e.target.value)}
                        id="tripmate"
                      />
                      <button type="button" onClick={addTripmates}>
                        Add
                      </button>
                    </>
                  ) : !open && tripmates.length === 0 ? (
                    <p className="info">
                      Your tripmates list is empty. Add a tripmate. You can
                      always change this later.
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="show-tripmates">
                    {tripmates.length === 0 ? (
                      <p className="no-tripmates"> </p>
                    ) : (
                      tripmates.map((item, index) => {
                        return (
                          <div className="tripmate-card" key={index.toString()}>
                            <h3 className="tripmate">{item}</h3>
                            <button
                              type="button"
                              onClick={() => removeTripmate(index)}
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="trip-info-wrapper">
              <div className="input-wrapper">
                <label htmlFor="startDate"> Start Date </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="startDate"> End Date </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="trip-info-wrapper">
              {!openNotes ? (
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => setOpenNotes(true)}
                >
                  Add Note
                </button>
              ) : openNotes ? (
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => setOpenNotes(false)}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
              <div className="input-wrapper">
                {openNotes ? (
                  <>
                    <input
                      type="text"
                      id="notes"
                      onChange={(e) => setAddNote(e.target.value)}
                    />
                    <button type="button" onClick={addNotes}>
                      Add
                    </button>
                  </>
                ) : !openNotes && notes.length === 0 ? (
                  <p className="info">
                    Your notes are empty. Add some notes about directions,
                    weather, what to bring, etc. You can always edit these
                    later.
                  </p>
                ) : (
                  ""
                )}

                <div className="show-notes">
                  {notes.length === 0 ? (
                    <p className="no-tripmates"> </p>
                  ) : (
                    notes.map((item, index) => {
                      return (
                        <div className="tripmate-card">
                          <p className="tripmate">{item}</p>
                          <button
                            type="button"
                            onClick={() => removeNote(index)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="trip-info-wrapper">
              {!openPlace ? (
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => setOpenPlace(true)}
                >
                  Add Attraction
                </button>
              ) : openPlace ? (
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => setOpenPlace(false)}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
              <div className="input-wrapper">
                {openPlace ? (
                  <>
                    <label htmlFor="attractions"> Attractions </label>
                    <input
                      type="text"
                      name=""
                      id="attraction-inpt"
                      onChange={(e) => setAddAttraction(e.target.value)}
                    />
                    <button type="button" onClick={addAttractions}>
                      Add
                    </button>
                  </>
                ) : !openPlace && attractions.length === 0 ? (
                  <p className="info">
                    You have not added any attractions yet. Use the map to help
                    you find out what's around. You can always edit this later.
                  </p>
                ) : (
                  ""
                )}
                <div className="show-attractions">
                  {attractions.length === 0 ? (
                    <p className="no-attractions"> </p>
                  ) : (
                    attractions.map((item, index) => {
                      return (
                        <div className="tripmate-card">
                          <h3 className="tripmate">{item}</h3>
                          <button
                            type="button"
                            onClick={() => removeAttraction(index)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="budget-wrapper">
              <h1> Budget </h1>
              <div className="add-budget">
                <div className="show-budget">
                  <label htmlFor="budget-inpt">$</label>
                  <input
                    type="text"
                    id="budget"
                    placeholder="0.00"
                    name="budget-inpt"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>

                <p> Set a budget for the your trip </p>
              </div>
              <p className="updated-budget">
                You have <span>{}</span> left in your budget
              </p>
            </div>
            <div className="trip-info-wrapper">
              <div className="input-wrapper">
                <label htmlFor="expense"> Expense </label>
                <input
                  className="item-expense"
                  type="text"
                  name=""
                  id="expense-item"
                  placeholder="item"
                  onChange={(e) => setItem(e.target.value)}
                />
                <input
                  className="cost-expense"
                  type="number"
                  placeholder="cost"
                  id="expense-cost"
                  onChange={(e) => setCost(e.target.value)}
                />
                <button type="button" onClick={addExpenses}>
                  Add Expense
                </button>
              </div>
              {expense.length === 0 ? (
                <p className="no-expenses">You have no expenses.</p>
              ) : (
                <div className="show-expenses">
                  <div className="expense-label">
                    <p> Item </p>
                    <p> Cost </p>
                  </div>
                  {expense.length === 0 ? (
                    <p className="no-attractions"> </p>
                  ) : (
                    expense.map((item, index) => {
                      return (
                        <div className="expense-card">
                          <h3 className="expense">
                            <div className="expense-box">
                              <p>{item.item}</p>
                              <p>${item.cost}</p>
                            </div>
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeExpense(index)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })
                  )}
                  <p className="expense-sum">
                    {/* Expense total: <span>${total}</span> */}
                  </p>
                </div>
              )}
            </div>
            <div className="controls">
              <button className="save-btn" type="submit">
                Save
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={closeEditor}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
}

export default TripEditor;
