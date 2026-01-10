const mongoose = require('mongoose');

const voiceQuerySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.Mixed,
      ref: "User",
    },

    audioUrl: String,

    userQuery:String,

    response: String,

    intentDetected: {
      type: String,
      enum: ["DISEASE", "SCHEME", "MARKET", "GENERAL"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VoiceQuery", voiceQuerySchema);
