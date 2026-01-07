const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cropName: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    symptomsText: {
      type: String,
    },

    detectedDisease: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
    },

    aiConfidence: {
      type: Number, 
    },

    treatmentSummary: {
      type: String,
    },
    sourceReference: {
      type: String, // handbook / page reference
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
