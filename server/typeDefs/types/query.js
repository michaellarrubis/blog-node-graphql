import { gql } from "apollo-server-express";

const query = gql`
  type Query {
    users: [User!]!
    posts(limit: ID!, page: ID!): PostsResponse!
    comments: [Comment!]!
    user(id: ID!): User!
    post(id: ID!): Post!
  }
`;

export { query as default };
