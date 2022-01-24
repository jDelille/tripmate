const router = require("express").Router();
const Trip = require("../models/tripModel");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const trip = await Trip.find({ user: req.user });
    res.json(trip);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const {
      tripName,
      destination,
      startDate,
      endDate,
      tripmates,
      notes,
      attractions,
      budget,
      expenses,
    } = req.body;

    // validation

    if (!destination && !tripName) {
      return res.status(400).json({
        errorMessage: "You need to enter a destination or some tripmates.",
      });
    }

    if (!notes)
      return res
        .status(400)
        .json({ errorMessage: "You must include a notes." });

    const newTrip = new Trip({
      tripName,
      destination,
      startDate,
      endDate,
      tripmates,
      notes,
      attractions,
      budget,
      expenses,
      user: req.user,
    });

    const savedTrip = await newTrip.save();

    res.json(savedTrip);
  } catch (err) {
    res.status(500).send("error here");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { tripName, destination, startDate, endDate, tripmates, notes, attractions, budget, expenses } =
      req.body;
    const tripId = req.params.id;

    // validation

    if (!destination && !tripName) {
      return res.status(400).json({
        errorMessage: "You need to enter a destination or some tripmates.",
      });
    }

    if (!tripId)
      return res.status(400).json({
        errorMessage:
          "Trip ID not given. Please contact the developer. Thank you.",
      });

    const originalTrip = await Trip.findById(tripId);
    if (!originalTrip)
      return res
        .status(400)
        .json({ errorMessage: "No snippet with this ID was found :( " });

    if (originalTrip.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    originalTrip.tripName = tripName;
    originalTrip.destination = destination;
    originalTrip.tripmates = tripmates;
    originalTrip.notes = notes;
    originalTrip.attractions = attractions;
    originalTrip.budget = budget;
    originalTrip.expenses = expenses;
    originalTrip.startDate = startDate;
    originalTrip.endDate = endDate;

    const savedTrip = await originalTrip.save();

    res.json(savedTrip);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const tripId = req.params.id;

    // validation

    if (!tripId)
      return res.status(400).json({
        errorMessage:
          "Trip ID not given. Please contact the developer. Thank you.",
      });

    const existingTrip = await Trip.findById(tripId);
    if (!existingTrip)
      return res
        .status(400)
        .json({ errorMessage: "No trip with this ID was found :( " });

    if (existingTrip.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    await existingTrip.delete();

    res.json(existingTrip);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
