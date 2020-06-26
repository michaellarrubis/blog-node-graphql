import UserQueries from '../db/queries/UserQueries'
import PostQueries from '../db/queries/PostQueries'
import CommentQueries from '../db/queries/CommentQueries'

const Query = {
	async users(parent, args, ctx, info) {
		return await UserQueries.getUsers()
	},
	async user(parent, { id }, ctx, info) {
		const user = await UserQueries.getUser({ id })

		if (!user) {
			throw new Error(`User with ID: ${id} is not found.`)
		}

		return user
	},
	async posts(parent, { limit, page }, ctx, info) {
		const postResults = await PostQueries.getPosts({limit: parseInt(limit), page: parseInt(page)})

		return {
			posts: postResults.rows,
			count: postResults.count
		}
	},
	async post(parent, { id }, ctx, info) {
		const post = await PostQueries.getPost({ id })

		if (!post) {
			throw new Error(`Post with ID: ${id} is not found.`)
		}

		return post
	},
	async comments(parent, args, ctx, info) {
		return await CommentQueries.getComments()
	}
}

export { Query as default }