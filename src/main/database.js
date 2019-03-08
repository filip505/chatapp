import { EntitySchema, createConnection, getRepository } from 'typeorm'
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

const connection = async () => await createConnection(config)()

export default connection

