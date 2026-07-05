const Trip = require("../models/Trip");

// Create Trip
const createTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, notes } = req.body;

    // Validation
    if (!destination || !startDate || !endDate || !budget) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Create trip
    const trip = new Trip({
      destination,
      startDate,
      endDate,
      budget,
      notes,
      user: req.user.id,
    });

    await trip.save();

    res.status(201).json({
      message: "Trip created successfully!",
      trip,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Trips
const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });

    res.status(200).json(trips);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Trip
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Trip updated successfully!",
      trip: updatedTrip,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    await trip.deleteOne();

    res.status(200).json({
      message: "Trip deleted successfully!",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTrip,
  getMyTrips,
  updateTrip,
  deleteTrip,
};