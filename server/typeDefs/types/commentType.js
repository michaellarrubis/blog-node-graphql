import { gql } from "apollo-server-express";

const commentType = gql`
  type Comment {
    id: ID!
    text: String!
    post: Post!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateCommentInput {
    text: String!
    postId: ID!
    userId: ID!
  }

  input UpdateCommentInput {
    text: String
    postId: ID
    userId: ID
  }
`;

export { commentType as default };
