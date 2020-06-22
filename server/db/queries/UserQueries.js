import db from '../models'

const getUsers = async () => {
	return await db.user.findAll({ include: [db.post, db.comment] })
}

const getUser = async (filter) => {
	return await db.user.findOne({ include: [db.post, db.comment], where: { ...filter } })
}

const registerUser = async (data) => {
	return await db.user.create({ ...data })
}

const updateUser = async (data) => {
	let user = await db.user.findByPk(data.id)
	user = data
	return await user.save()
}

const deleteUser = async (id) => {
	return await db.user.destroy({ where: { id }})
}

const UserQueries = {
	getUsers,
	getUser,
	registerUser,
	updateUser,
	deleteUser
}

export { UserQueries as default }