require('dotenv').config()
import uuidv4 from 'uuid/v4'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserQueries from '../db/queries/UserQueries'
import PostQueries from '../db/queries/PostQueries'
import CommentQueries from '../db/queries/CommentQueries'

const Mutation = {
	async loginUser(parent, { data }, ctx, info) {
		const user = await UserQueries.getUser({ email: data.email })

		if (!user) {
			throw new Error('Invalid Login.')
		}

		const passwordCheck = await bcrypt.compare(data.password, user.password)

		if (!user) {
			throw new Error('Invalid Login.')
		}

		const token = jwt.sign(
	    {
	      id: user.id,
	      email: user.email,
	      name: user.name
	    },
	    process.env.JWT_SECRET_KEY,
	    {
	      expiresIn: process.env.JWT_EXPIRES_IN
	    }
	  )
	  return {
	    token,
	    user
	  }
	},
	async registerUser(parent, { data }, ctx, info) {
		const user = await UserQueries.getUser({ email: data.email })

		if (user) {
			throw new Error(`User with Email: ${data.email} is already taken.`)
		}

		if (!data.name) {
			throw new Error('Name should not be empty.')
		}

		const hashedPassword = await bcrypt.hash(data.password, 10)

		return await UserQueries.registerUser({
			name: data.name,
			email: data.email,
			password: hashedPassword
		})
	},
	async updateUser(parent, { id, data }, ctx, info) {
		let user = await UserQueries.getUser({ id })

		if (!user) {
			throw new Error(`User with ID: ${id} is not found.`)
		}

		if (typeof data.email === 'string') {
			const userExist = await UserQueries.getUser({ email: data.email })

			if (userExist) {
				throw new Error(`User with Email: ${data.email} is already taken.`)
			}

			user.email = data.email
		}

		user.name = data.name
		user.age = data.age
		user.udpatedAt = Date.now()

		return await UserQueries.updateUser(user)
	},
	async deleteUser(parent, { id }, ctx, info) {
		const removedUser = await UserQueries.getUser({ id })
		const user = await UserQueries.deleteUser(id)

		if (user == 0) {
			throw new Error(`User with ID of ${id} is not removed. Maybe it does not exist!`)
		}

		return removedUser
	},
	async createPost(parent, { data }, { currentUser }, info) {
		if (!currentUser) {
			throw new Error('Not Logged In.')
		}
		
		return await PostQueries.createPost({
			title: data.title,
			body: data.body,
			published: data.published,
			userId: data.userId
		})
	},
	async updatePost(parent, { id, data }, ctx, info) {
		let post = await PostQueries.getPost({ id })

		if (!post) {
			throw new Error('Post not found')
		}

		if (typeof data.title === 'string') {
			post.title = data.title
		}

		if (typeof data.body === 'string') {
			post.body = data.body
		}

		if (typeof data.published === 'boolean') {
			post.published = data.published
		}
		
		return await PostQueries.updatePost(post)
	},
	async deletePost(parent, { id }, ctx, info) {
		const post = await PostQueries.getPost({ id })

		if (!post) {
			throw new Error('Post not Found')
		}

		await PostQueries.deletePost(id)
		return post
	},
	async createComment(parent, { data }, ctx, info) {
		const user = await UserQueries.getUser({id: data.userId})
		const post = await PostQueries.getPost({id: data.postId})

		if (!user || !post || !post.published) {
			throw new Error('Unable to comment')
		}

		return await CommentQueries.createComment({
			text: data.text,
			userId: data.userId,
			postId: data.postId
		})
	},
	async updateComment(parent, { id, data }, ctx, info) {
		let comment = await CommentQueries.getComment({ id })

		if (!comment) {
			throw new Error('Comment Not Found')
		}

		if (typeof data.text === 'string') {
			comment.text = data.text
		}

		await CommentQueries.updateComment(comment)
		return comment
	},
	async deleteComment(parent, { id }, ctx, info) {
		const comment = await CommentQueries.getComment({ id })

		if (!comment) {
			throw new Error('Comment not Found')
		}

		await CommentQueries.deleteComment(id)
		return comment
	}
}

export { Mutation as default }