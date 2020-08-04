import { gql } from "apollo-server-express";

const postType = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    slug: String
    published: Boolean!
    imageUrl: String!
    createdAt: Date!
    updatedAt: Date!
    user: User!
    comments: [Comment!]!
  }

  input postInput {
    title: String
    published: Boolean
    slug: String
    body: String
    imageUrl: String
    userId: ID
  }
`;

export { postType as default };
