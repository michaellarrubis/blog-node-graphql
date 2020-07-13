require('dotenv').config()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import queryUser from '../../db/queries/user'

const generateToken = (user) => {
	const access_token = jwt.sign(
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
	    access_token,
	    user
	}
}

export const loginUser = async (parent, { data }, ctx, info) => {
	const user = await queryUser.getUser({ email: data.email })

	if (!user) {
		throw new Error('Email or Password is Invalid.')
	}

	const passwordCheck = await bcrypt.compare(data.password, user.password)

	if (!passwordCheck) {
		throw new Error('Password is Invalid.')
	}

	return generateToken(user);
};

export const registerUser = async (parent, { data }, ctx, info) => {
	const user = await queryUser.getUser({ email: data.email })

	if (user) {
		throw new Error(`Email is already taken.`)
	}

	if (!data.name) {
		throw new Error('Name should not be empty.')
	}

	const hashedPassword = await bcrypt.hash(data.password, 10)

	const newUser = await queryUser.registerUser({
		name: data.name,
		email: data.email,
		password: hashedPassword
	})

	return generateToken(newUser.dataValues);
};

export const updateUser = async (parent, { id, data }, { currentUser }, info) => {
	if (!currentUser) {
		throw new Error('Not Logged In.')
	}

	let user = await queryUser.getUser({ id })

	if (!user) {
		throw new Error(`User with ID: ${id} is not found.`)
	}

	if (typeof data.email === 'string') {
		const userExist = await queryUser.getUser({ email: data.email })

		if (userExist) {
			throw new Error(`User with Email: ${data.email} is already taken.`)
		}

		user.email = data.email
	}

	user.name = data.name
	user.age = data.age
	user.udpatedAt = Date.now()

	return await queryUser.updateUser(user)
};

export const deleteUser = async (parent, { id }, { currentUser }, info) => {
	if (!currentUser) {
		throw new Error('Not Logged In.')
	}

	const removedUser = await queryUser.getUser({ id })
	const user = await queryUser.deleteUser(id)

	if (user == 0) {
		throw new Error(`User with ID of ${id} is not removed. Maybe it does not exist!`)
	}

	return removedUser
};