import db from '../models'

const getPosts = async ({ limit, page }) => {
	return await db.post.findAndCountAll({ 
		limit: limit, 
		offset: (page - 1) * limit, 
		include: [{ model: db.user, required: true }, db.comment], 
		where: { published: true },
		order: [
			['id', 'DESC']
		]
	})
}

const getPostsCount = async () => {
	return await db.post.findAll({ 
		where: { published: true }
	})
}

const getPost = async (filter) => {
	return await db.post.findOne({ 
		include: [{ model: db.user, required: true}, db.comment],
		where: { ...filter } 
	})
}

const createPost = async (data) => {
	return await db.post.create({ ...data })
}

const updatePost = async (data) => {
	let post = await db.post.findByPk(data.id)
	post = data
	return await post.save()
}

const deletePost = async (id) => {
	return await db.post.destroy({ where: { id }})
}

const PostQueries = {
	getPosts,
	getPostsCount,
	getPost,
	createPost,
	updatePost,
	deletePost
}

export { PostQueries as default }