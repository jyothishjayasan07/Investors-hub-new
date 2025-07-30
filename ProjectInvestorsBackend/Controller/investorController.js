const Intrested = require("../Model/Investor");

const mongoose = require("mongoose");




const IntrestedProjects = async (req, res) => {
  try {
    const { projectId, availableDates } = req.body;
    const userId = req.user.userId;

    // ✅ Check if the user already showed interest in this project
    const existingIntrested = await Intrested.findOne({ projectId, UserId: userId });
    if (existingIntrested) {
      return res.status(400).json({
        message: "You have already shown interest in this project.",
      });
    }

    // ✅ Create and save new Intrested document
    const newIntrested = new Intrested({
      projectId,
      UserId: userId,
      availableDates,
    });

    const savedIntrested = await newIntrested.save();

    res.status(201).json({
      message: "Interest registered successfully",
      data: savedIntrested,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};






const scheduleMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedDate } = req.body;

    // ✅ Check if date is provided
    if (!selectedDate) {
      return res.status(400).json({ message: "Please provide a selectedDate" });
    }

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid interest ID" });
    }

    // ✅ Find the interest document
    const existingIntrested = await Intrested.findById(id);
    if (!existingIntrested) {
      return res.status(404).json({ message: "Interested project not found" });
    }

    // ✅ Check if the same interest already has this date scheduled
    if (
      existingIntrested.scheduledDate &&
      new Date(existingIntrested.scheduledDate).toISOString() === new Date(selectedDate).toISOString()
    ) {
      return res.status(400).json({ message: "Meeting already scheduled for this date" });
    }

    // ✅ Update the scheduledDate
    const updatedIntrested = await Intrested.findByIdAndUpdate(
      id,
      { $set: { scheduledDate: new Date(selectedDate) } },
      { new: true }
    );

    res.status(200).json({
      message: "Meeting scheduled successfully",
      data: updatedIntrested,
    });
  } catch (error) {
    console.error("Error scheduling meeting:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllScheduledMeetingsForParticularProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const scheduledMeetings = await Intrested.find({
      projectId,
      scheduledDate: { $ne: null },
    })
      .populate("UserId", "name email number")
      .populate("projectId", "title companyName description fundingGoal");

    res.status(200).json(scheduledMeetings);
  } catch (error) {
    console.error("Error fetching scheduled meetings:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};






module.exports={IntrestedProjects,scheduleMeeting,getAllScheduledMeetingsForParticularProject}