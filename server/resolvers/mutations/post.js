import queryPost from '../../db/queries/post'

export const createPost = async (parent, { data }, { currentUser }, info) => {
	if (!currentUser) {
		throw new Error('Not Logged In.')
	}
	
	return await queryPost.createPost({
		title: data.title,
		body: data.body,
		published: data.published,
		imageUrl: data.imageUrl || "",
		userId: data.userId
	})
};

export const updatePost = async (parent, { id, data }, { currentUser }, info) => {
	if (!currentUser) {
		throw new Error('Not Logged In.')
	}

	let post = await queryPost.getPost({ id })

	if (!post) {
		throw new Error('Post not found')
	}

	post.title = data.title
	post.body = data.body
	post.published = data.published
	post.imageUrl = data.imageUrl
	
	return await queryPost.updatePost(post)
};

export const deletePost = async (parent, { id }, { currentUser }, info) => {
	if (!currentUser) {
		throw new Error('Not Logged In.')
	}

	const post = await queryPost.getPost({ id })

	if (!post) {
		throw new Error('Post not Found')
	}

	await queryPost.deletePost(id)
	return post
};