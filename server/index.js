require('dotenv').config()
import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'

import typeDefs from './schema'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'

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
		Mutation
	},
	context: ({ req }) => {
		const tokenWithBearer = req.headers.authorization || ''
	  const token = tokenWithBearer.split(' ')[1]
	  const currentUser = getUserToken(token)

	  return {
	    currentUser
	  }
	}
})

server.applyMiddleware({ app, path: '/graphql' })
 
app.listen({ port: 3000 }, () => {
  console.log('Apollo Server on http://localhost:3000/graphql')
})