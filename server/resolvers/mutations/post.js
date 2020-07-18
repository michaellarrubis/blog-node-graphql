import queryPost from '../../db/queries/post'
import { checkCurrentUserIsAuthorized } from '../../utils/helper'

export const upsertPost = async (parent, { id, data }, { currentUser }, info) => {
	checkCurrentUserIsAuthorized(currentUser)

	if (!id) {
		if (!data.title) {
			throw new Error('Must provide a title.')
		}

		return await queryPost.createPost({
			title: data.title,
			body: data.body,
			published: data.published,
			imageUrl: data.imageUrl || "",
			userId: data.userId
		})
	} else {
		let post = await queryPost.getPost({ id })

		if (!post) {
			throw new Error('Post not found')
		}

		post.title = data.title
		post.body = data.body
		post.published = data.published
		post.imageUrl = data.imageUrl
		
		return await queryPost.updatePost(post)
	}
}

export const deletePost = async (parent, { id }, { currentUser }, info) => {
	checkCurrentUserIsAuthorized(currentUser)

	const post = await queryPost.getPost({ id })

	if (!post) {
		throw new Error('Post not Found')
	}

	await queryPost.deletePost(id)
	return post
}