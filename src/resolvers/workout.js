import { User } from '../models';

export default {
  Query: {
    scoringTypes: (root, args, context, info) => {
      return 'scoringTypes';
    },
    workout: (root, args, context, info) => {
      console.log(args);
      return 'workout';
    },
    workouts: () => {
      return 'workouts';
    }
  },

  Mutation: {
    createWorkout: async (root, args, context, info) => {
      console.log(args);
      return 'createWorkout';
    },
    editWorkout: async (root, args, context, info) => {
      console.log(args);
      return 'editWorkout';
    }
  }
};
