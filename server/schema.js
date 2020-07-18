import { gql } from 'apollo-server-express'

const typeDefs = gql `
	scalar Date

	type Query {
		users: [User!]!
		posts(limit: ID!, page: ID!): PostsResponse!
		comments: [Comment!]!
		user(id: ID!): User!
		post(id: ID!): Post!
	}

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
	
	# Custom Types
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

	type LoginResponse {
	  access_token: String
	  user: User
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		imageUrl: String!
		createdAt: Date!
		updatedAt: Date!
		user: User!
		comments: [Comment!]!
	}

	type PostsResponse {
		posts: [Post!]!
		count: ID!
	}

	type Comment {
		id: ID!
		text: String!
		post: Post!
		user: User!
		createdAt: Date!
		updatedAt: Date!
	}

	# Inputs
	# Create 
	input RegisterInput {
		name: String!
		email: String!
		password: String!
	}

	input LoginInput {
		email: String!
		password: String!
	}

	input postInput {
		title: String
		published: Boolean
		body: String
		imageUrl: String
		userId: ID
	}

	input CreateCommentInput {
		text: String!
		postId: ID!
		userId: ID!
	}

	# Update 
	input UpdateUserInput {
		name: String
		email: String
		age: Int
	}

	input UpdateCommentInput {
		text: String
		postId: ID
		userId: ID
	}
`

export { typeDefs as default }