import { User } from '../models';
import { Workout } from '../models';

export default {
  Query: {
    scoringTypes: (root, args, context, info) => {
      return ['TIME', 'REPS'];
    },
    workout: (root, args, context, info) => {
      const workout = Workout.findById(args.id);
      return workout;
    },
    workouts: () => {
      const workouts = Workout.find();
      return workouts;
    }
  },

  Mutation: {
    createWorkout: async (root, args, context, info) => {
      const workout = await Workout.create(args);
      return workout;
    },
    editWorkout: async (root, args, context, info) => {
      const workout = await Workout.findByIdAndUpdate(args.id, args, {
        new: true,
        runValidators: true
      });
      return workout;
    }
  }
};
