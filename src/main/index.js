
import '@babel/polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import v1 from 'uuid'
import { EntitySchema, createConnection } from 'typeorm'
import { authMiddleware, oauthMiddleware } from './middleware'
import { authController } from './routes'
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
  logging: false,
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
  await connection.runMigrations()
  console.log('is clean', config.entities.length)
  if (process.env.NODE_ENV === 'test') {
    
    
  }

  let app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(authMiddleware)
  authController(app)
  app.get('/ping', (req, res) => {
    res.send('pong')
  })

  app.get('/ping2', oauthMiddleware('user'), (req, res) => {
    res.send('pong')
  })
  //user(app)

  // const user = await fixtures.createUser([{ id: v1() }, { id: v1() }])

  // console.log('saved', user)
  // const tokens = await getRepository('token').find()
  // console.log('tokens', tokens)
  // const users = await getRepository('person').delete({id: '97fe1c29-2eef-4d78-b53e-49664c8d70dd'})
  // console.log('users', users)
  app = http.createServer(app)
  app = app.listen(5001)
  app.close()
  
  

  console.log('___________________________')
  console.log('server started at port 5001')
  console.log('server env ' + process.env.NODE_ENV)
  console.log('database name ' + config.database)
  // send back closing function
  
  resolve({
    app,
    connection,
    fixtures
  })
})