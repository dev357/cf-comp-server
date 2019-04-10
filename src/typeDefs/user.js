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

  type User {
    id: ID!
    email: String!
    roles: [Role]!
  }
`;
