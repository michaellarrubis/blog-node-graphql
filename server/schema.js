import { gql } from 'apollo-server-express'

const typeDefs = gql `
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

		createPost(data: CreatePostInput!): Post!
		updatePost(id: ID!, data: UpdatePostInput!): Post!
		deletePost(id: ID!): Post!

		createComment(data: CreateCommentInput!): Comment!
		updateComment(id: ID!, data: UpdateCommentInput!): Comment!
		deleteComment(id: ID!): Comment!

		registerUser(data: RegisterInput!): User!
		loginUser(data: LoginInput!): LoginResponse!
	}
	
	# Custom Types
	type User {
		id: ID!
		name: String
		email: String!
		age: Int
		createdAt: String
		updatedAt: String
		posts: [Post!]!
		comments: [Comment!]!
	}

	type LoginResponse {
	  token: String
	  user: User
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		imageUrl: String!
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

	input CreatePostInput {
		title: String!
		published: Boolean
		body: String
		imageUrl: String
		userId: ID!
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

	input UpdatePostInput {
		title: String
		published: Boolean
		body: String
		imageUrl: String
		userId: ID
	}

	input UpdateCommentInput {
		text: String
		postId: ID
		userId: ID
	}
`

export { typeDefs as default }