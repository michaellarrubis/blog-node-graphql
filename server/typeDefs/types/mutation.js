import { gql } from "apollo-server-express";

const mutation = gql`
  type Mutation {
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!

    upsertPost(id: ID, data: postInput!): Post!
    deletePost(id: ID!): Post!

    createComment(data: CreateCommentInput!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!

    registerUser(data: RegisterInput!): LoginResponse!
    loginUser(data: LoginInput!): LoginResponse!
  }
`;

export { mutation as default };
