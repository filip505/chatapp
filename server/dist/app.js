"use strict";

require("@babel/polyfill");

var _env = _interopRequireDefault(require("./env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var app = express();
var port = 5001;
app.get('/ping', function (req, res) {
  return res.send(JSON.stringify(_env.default));
});
app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
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