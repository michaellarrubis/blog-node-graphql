import db from '../models'

const getPosts = async ({ limit, offset }) => {
	return await db.post.findAll({ limit: limit, offset: offset, include: [{ model: db.user, required: true }, db.comment] })
}

const getPost = async (filter) => {
	return await db.post.findOne({ include: [{ model: db.user, required: true}, db.comment], where: { ...filter } })
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
	getPost,
	createPost,
	updatePost,
	deletePost
}

export { PostQueries as default }