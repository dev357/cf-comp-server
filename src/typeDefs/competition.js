import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    greet2: String!
  }

  extend type Mutation {
    greet3: String!
  }

  type Competition {
    id: ID!
    name: String!
    date: String!
    events: [Event]!
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
  }

  type EventWOD {
    workout: Workout
    division: Division
  }
`;
