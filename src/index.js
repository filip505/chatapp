
import '@babel/polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import { EntitySchema, createConnection } from 'typeorm'
import authMiddleware from './middleware/auth'
import { User, Token } from './models'
import Fixtures from './fixtures'
import { auth } from './routes'
import cors from 'cors'

const config = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "node",
  password: "node",
  database: "node",
  synchronize: false,
  logging: true,
  migrations: ["./migration/*.js"],
  cli: {
    "migrationsDir": "migration"
  },
  entities: [
    new EntitySchema(User),
    new EntitySchema(Token)
  ]
}

export const server = new Promise(async function (resolve, reject) {
  const connection = await createConnection(config)
  const fixtures = new Fixtures(connection)
  if (process.env.NODE_ENV === 'dev') {
    await connection.runMigrations()
    for (let i = 0; i < config.entities.lenrgth; i++) {
      const item = config.entities[i].options.name
      await connection.query('delete from ' + item)
    }
    await fixtures.init()
  }
  else {
    await connection.runMigrations()
  }

  let app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(authMiddleware)
  auth(app)
  app.get('/ping', (req, res) => {
    res.send('pong')
  })
  //user(app)

  app = http.createServer(app)
  await app.listen(5001)

  console.log('___________________________')
  console.log('server started at port 5001')
  console.log('server env ' + process.env.NODE_ENV)

  // send back closing function
  resolve({
    app,
    connection,
    fixtures
  })
})