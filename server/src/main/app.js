import '@babel/polyfill'
import { createConnection, } from 'typeorm'
import { User, Token, Message, Conversation, Subject } from './models'

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
    User,
    Conversation,
    Subject,
    Token,
    Message
  ]
}

let connection

createConnection(config).then(async function(newConnection){
  connection = newConnection
  await require('./server').default(5001)
}, function(error){
  console.log('error', error)
})

export default connection

