require('dotenv').config()
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLDateTime } from "graphql-iso-date"
import passport from 'passport'
import passportJWT from 'passport-jwt'
import morgan from 'morgan'

import typeDefs from './schema'
import Query from './resolvers/query'
import Mutation from './resolvers/mutations'

import userQuery from './db/queries/user'

const corsOptions = {
	origin: process.env.ALLOWED_ORIGIN,
	credentials: true,
}

const { Strategy, ExtractJwt } = passportJWT
const params = {
	secretOrKey: process.env.SECRET_KEY,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, async (payload, done) => {
	const user = await userQuery.getUser({ email: payload.email })
  
	return done(null, user)
})

passport.use(strategy)

const app = express()
app.use(cors(corsOptions))
app.use(morgan('dev'))
passport.initialize()

app.use('/graphql', (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (user) {
			req.user = {
				id: user.id,
				name: user.name,
				email: user.email
			}
		}

		next()
	})(req, res, next)
})

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation,
		Date: GraphQLDateTime
	},
	context: ({ req }) => ({
		currentUser: req.user
	}),
	introspection: true,
	playground: true
})

server.applyMiddleware({ app })
 
app.listen(process.env.PORT || 4200)