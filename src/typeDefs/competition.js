import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User @auth
    users: [User!]! @auth(roles: [ADMIN])
    greet: String!
  }

  extend type Mutation {
    signUp(email: String!, password: String!): String
    signIn(email: String!, password: String!): String
    signOut: Boolean @auth
  }

  type Competition {
    id: ID!
    name: String!
    events: [Events]!
    competitors: [Competitor]!
    divisions: [Division]!
  }

  type Competitor {
    id: ID!
    name: String!
    division: Division!
  }

  type Division {
    id: ID!
    name: String!
  }

  type Event {
    id: ID!
    name: String!
    numOfWODs: Int!
    WODs: [[EventWOD]]
      1: {
        M: workoutID
        N: workoutID
      },
      2: {
        M: workoutID
        N: workoutID
      }
    ]
  }

  type EventWOD {
    workout: Workout
    division: Division
  }

  type Workout {
    id: ID!
    name: String!
    description: String!
    scoringType: scoringType!
  }

  enum scoringType {
    TIME,
    REPS
  }
`;
