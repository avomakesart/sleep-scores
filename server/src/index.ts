import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import 'dotenv-safe/config'
import express from 'express'
import path from 'path'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { __prod__ } from './constants'
import { Score } from './entities/Score'
import { ScoreResolver } from './resolvers/score'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core'

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    // ssl: {
    //   requestCert: true,
    //   rejectUnauthorized: false,
    // },
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Score],
  })

  const app = express()

  app.set('trust proxy', 1)
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ScoreResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}/graphql`)
  })
}

main().catch((err) => console.error(err))
