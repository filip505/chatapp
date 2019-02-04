
import '@babel/polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import v1 from 'uuid'
import { EntitySchema, createConnection, getRepository } from 'typeorm'
import authMiddleware from './middleware/auth.middleware'
import authorization from './middleware/authorization'
import { User, Token } from './models'
import Fixtures from './fixtures'
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
  // if (process.env.NODE_ENV === 'dev') {
  //   await connection.runMigrations()
  //   for (let i = 0; i < config.entities.lenrgth; i++) {
  //     const item = config.entities[i].options.name
  //     await connection.query('delete from ' + item)
  //   }
  //   await fixtures.init()
  // }
  // else {
  await connection.runMigrations()
  // }

  let app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(authMiddleware)
  //auth(app)
  app.get('/ping', (req, res) => {
    res.send('pong')
  })

  app.get('/ping2', authorization('user'), (req, res) => {
    res.send('pong')
  })
  //user(app)
  console.log(v1(), v1())

  // const user = await fixtures.createUser([{ id: v1() }, { id: v1() }])

  // console.log('saved', user)
  // const tokens = await getRepository('token').find()
  // console.log('tokens', tokens)
  // const users = await getRepository('person').delete({id: '97fe1c29-2eef-4d78-b53e-49664c8d70dd'})
  // console.log('users', users)
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