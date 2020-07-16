import queryUser from '../../db/queries/user'
import queryPost from '../../db/queries/post'
import queryComment from '../../db/queries/comment'

export default {
	async users(parent, args, ctx, info) {
		return await queryUser.getUsers()
	},
	async user(parent, { id }, ctx, info) {
		const user = await queryUser.getUser({ id })

		if (!user) {
			throw new Error(`User with ID: ${id} is not found.`)
		}

		return user
	},
	async posts(parent, { limit, page }, ctx, info) {
		const postCounts = await queryPost.getPostsCount()
		const postResults = await queryPost.getPosts({limit: parseInt(limit), page: parseInt(page)})

		return {
			posts: postResults.rows,
			count: postCounts.length
		}
	},
	async post(parent, { id }, ctx, info) {
		const post = await queryPost.getPost({ id })

		if (!post) {
			throw new Error(`Post with ID: ${id} is not found.`)
		}

		return post
	},
	async comments(parent, args, ctx, info) {
		return await queryComment.getComments()
	}
}
