import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User @auth(roles: [USER])
    users: [User!]! @auth(roles: [ADMIN])
    greet(name: String): String!
  }

  extend type Mutation {
    signUp(email: String!, password: String!): User
    signIn(email: String!, password: String!): User
    signOut: Boolean
  }

  type User {
    id: ID!
    email: String!
  }
`;
