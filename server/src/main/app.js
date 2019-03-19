import '@babel/polyfill'
const express = require('express')
const app = express()
const port = 5001

app.get('/ping', (req, res) => res.send('pong'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// import { createConnection, } from 'typeorm'
// import { User, Token, Message, Conversation, Subject } from './models'
// //eb deploy Mynode-env
// //eb init -p docker mynode
// const config = {
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "node",
//   password: "testing2019",
//   database: "node",
//   synchronize: false,
//   logging: true,
//   migrations: ["./migration/*.js"],
//   cli: {
//     "migrationsDir": "migration"
//   },
//   entities: [
//     User,
//     Conversation,
//     Subject,
//     Token,
//     Message
//   ]
// }

// let connection

// createConnection(config).then(async function(newConnection){
//   connection = newConnection
//   await require('./server').default(5001)
// }, function(error){
//   console.log('error', error)
// })

// export default connection

