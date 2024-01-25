const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Workout = require("../models/workoutModel");

const getAllWorkouts = asyncHandler(async (req, res) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workout);
});

const getSingleWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ "Controller error": "No such workout found." });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res
      .status(404)
      .json({ "Controller error": "No value for workout." });
  }
  res.status(200).json(workout);
});

const createWorkout = asyncHandler(async (req, res) => {
  const { title, reps, load } = req.body;
  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields.", emptyFields });
  }
  const workout = await Workout.create({ title, reps, load });
  res.status(200).json(workout);
});

// router.post("/", async (req, res) => {
//   const { title, reps, load } = req.body;
//   try {
//     const workout = await Workout.create({ title, reps, load });
//     res.status(200).json(workout);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

const deleteWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ "Controller error": "No such workout found." });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res
      .status(400)
      .json({ "Controller error": "No value for workout." });
  }

  res.status(200).json(workout);
});

const updateWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ "Controller error": "No such workout found." });
  }
  const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res
      .status(400)
      .json({ "Controller error": "No value for workout." });
  }

  res.status(200).json(workout);
});

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
