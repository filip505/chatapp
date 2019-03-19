"use strict";

require("@babel/polyfill");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.get('ping', function (req, res) {
  res.send('pong');
}); // import { createConnection, } from 'typeorm'
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
//# sourceMappingURL=app.js.map