import db from '../models'

const getUsers = async () => {
	const _users = await db.user.findAll({ include: [db.post, db.comment] })
	return _users ? _users.dataValues : []
}

const getUser = async (filter) => {
	const _user = await db.user.findOne({ include: [db.post, db.comment], where: { ...filter } })
	return _user ? _user.dataValues : {}
}

const registerUser = async (data) => {
	const _user = await db.user.create({ ...data })
	return _user ? user.dataValues : {}
}

const updateUser = async (data) => {
	let _user = await db.user.findByPk(data.id)
	_user = data
	return await _user.save()
}

const deleteUser = async (id) => {
	return await db.user.destroy({ where: { id }})
}

const queries = {
	getUsers,
	getUser,
	registerUser,
	updateUser,
	deleteUser
}

export { queries as default }