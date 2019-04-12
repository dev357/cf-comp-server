import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    scoringTypes: [ScoringType]!
    workout(id: ID!): Workout
    workouts: [Workout]!
  }

  extend type Mutation {
    createWorkout(
      name: String!
      description: String!
      scoringType: ScoringType!
    ): Workout
    editWorkout(
      id: ID!
      name: String!
      description: String!
      scoringType: ScoringType!
    ): String
  }

  type Workout {
    id: ID!
    name: String!
    description: String!
    scoringType: ScoringType!
  }

  enum ScoringType {
    TIME
    REPS
  }
`;
