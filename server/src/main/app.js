import '@babel/polyfill'
// const express = require('express')
// const app = express()
// const port = 5001

// app.get('/ping', (req, res) => res.send(JSON.stringify(process.env)))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
import '@babel/polyfill'
import { createConnection, } from 'typeorm'
import { User, Token, Message, Conversation, Subject } from './models'

const config = {
  type: "postgres",
  host: (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost',
  port: 5432,
  username: (process.env.DB_USER) ? process.env.DB_USER : 'node',
  password: (process.env.DB_PASS) ? process.env.DB_PASS : 'node',
  database: "node",
  synchronize: false,
  logging: true,
  migrations: ["./migration/*.js"],
  cli: {
    "migrationsDir": "migration"
  },
  entities: [
    User,
    Conversation,
    Subject,
    Token,
    Message
  ]
}

let connection

createConnection(config).then(async function (newConnection) {
  connection = newConnection
  await require('./server').default(5001)
}, function (error) {
  console.log('error', error)
})

export default connection

