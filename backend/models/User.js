import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    },
    responses: {
      type: Map,
      of: Number,
      default: {}
    },
    ratings: {
      onboarding1: { type: Number, min: 0, max: 10 },
      onboarding2: { type: Number, min: 0, max: 10 },
      modern: { type: Number, min: 0, max: 10 },
      gamified1: { type: Number, min: 0, max: 10 },
      professional1: { type: Number, min: 0, max: 10 },
      professional2: { type: Number, min: 0, max: 10 },
      clean: { type: Number, min: 0, max: 10 },
      gamified2: { type: Number, min: 0, max: 10 },
      gamified3: { type: Number, min: 0, max: 10 }
    },
    metadata: {
      userAgent: String,
      ipAddress: String,
      submittedAt: {
        type: Date,
        default: Date.now
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserSchema);
