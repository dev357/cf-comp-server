import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scoringType: {
      type: String,
      enum: ['TIME', 'REPS'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
