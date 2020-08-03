import { gql } from "apollo-server-express";

const userType = gql`
  type User {
    id: ID!
    name: String
    email: String!
    age: Int
    createdAt: Date
    updatedAt: Date
    posts: [Post!]!
    comments: [Comment!]!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }
`;

export { userType as default };
