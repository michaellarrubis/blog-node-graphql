require('dotenv').config()
import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import { GraphQLDateTime } from "graphql-iso-date";

import typeDefs from './schema'
import Query from './resolvers/query'
import Mutation from './resolvers/mutations'

const app = express()
app.use(cors())
app.use(morgan('dev'))


const getUserToken = (token) => {
  	try {
    	return token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : null
  	} catch (err) {
    	return null
  	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation,
		Date: GraphQLDateTime
	},
	context: ({ req }) => {
		const tokenWithBearer = req.headers.authorization || ''
	  	const token = tokenWithBearer.split(' ')[1]
	  	const currentUser = getUserToken(token)

	  	return {
	    	currentUser
	  	}
	},
	introspection: true,
	playground: true
})

server.applyMiddleware({ app, path: '/graphql' })
 
app.listen(process.env.PORT || 4200)