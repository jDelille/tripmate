const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const tripSchema = new mongoose.Schema(
  {
    tripName: {
      type: String,
    },
    destination: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    tripmates: {
      type: Array,
    },
    notes: {
      type: Array,
    },
    attractions: {
      type: Array,
    },
    expenses: {
      type: Array,
    },
    budget: {
      type: String,
    },
    user: {
      type: ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("trip", tripSchema);

module.exports = Trip;
