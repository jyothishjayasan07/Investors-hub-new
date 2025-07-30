const { default: mongoose } = require("mongoose");

const IntrestedSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companyprojects",
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
  },
  availableDates: [{ type: Date }],
  scheduledDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent duplicate interest per user per project
IntrestedSchema.index({ projectId: 1, UserId: 1 }, { unique: true });

const Intrested = mongoose.model("Intrested", IntrestedSchema);
module.exports = Intrested;
