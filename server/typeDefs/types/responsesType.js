import { gql } from "apollo-server-express";

const responsesType = gql`
  type PostsResponse {
    posts: [Post!]!
    count: ID!
  }

  type LoginResponse {
    access_token: String
    user: User
  }
`;

export { responsesType as default };
