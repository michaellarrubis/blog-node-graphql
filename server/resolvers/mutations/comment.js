import queryUser from '../../db/queries/user'
import queryPost from '../../db/queries/post'
import queryComment from '../../db/queries/comment'

export const createComment = async (parent, { data }, { currentUser }, info) => {
	if (!currentUser) {
		throw new Error('Not Logged In.')
	}

	const user = await queryUser.getUser({id: data.userId})
	const post = await queryPost.getPost({id: data.postId})

	if (!user || !post || !post.published) {
		throw new Error('Unable to comment')
	}

	return await queryComment.createComment({
		text: data.text,
		userId: data.userId,
		postId: data.postId
	})
};

export const updateComment = async (parent, { id, data }, { currentUser }, info) => {
	if (!currentUser) {
		throw new Error('Not Logged In.')
	}

	let comment = await queryComment.getComment({ id })

	if (!comment) {
		throw new Error('Comment Not Found')
	}

	if (typeof data.text === 'string') {
		comment.text = data.text
	}

	await queryComment.updateComment(comment)
	return comment
};

export const deleteComment = async (parent, { id }, { currentUser }, info) => {
	if (!currentUser) {
		throw new Error('Not Logged In.')
	}

	const comment = await queryComment.getComment({ id })

	if (!comment) {
		throw new Error('Comment not Found')
	}

	await queryComment.deleteComment(id)
	return comment
};