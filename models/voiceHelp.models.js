const mongoose = require('mongoose');

const voiceQuerySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    audioUrl: String,

    transcribedText: String,

    intentDetected: {
      type: String,
      enum: ["DISEASE", "SCHEME", "MARKET", "GENERAL"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VoiceQuery", voiceQuerySchema);
