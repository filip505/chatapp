const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./middleware/auth')
const fixtures = require('./fixtures/fixtures')
const User = require('./models/User')
const Test = require('./models/Token')
const typeorm = require("typeorm");
const { createConnection } = require('typeorm')
const EntitySchema = typeorm.EntitySchema;
const config = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "node",
  password: "node",
  database: "node",
  synchronize: false,
  logging: true,
  migrations: ["migration/*.js"],
  cli: {
    "migrationsDir": "migration"
  },
  entities: [
    new EntitySchema(User),
    new EntitySchema(Test)
  ]
}

module.exports = new Promise(async function (resolve, reject) {
  const connection = await createConnection(config)
  // if (process.env.NODE_ENV === 'dev') {
  //   await connection.runMigrations()
  //   config.entities.forEach(async (item) => {
  //     await connection.query('delete from ' + item.options.name)
  //   })
  //   fixtures.init(connection)
  // }
  // else {
  //   connection.runMigrations()
  // }
  let app = express()
  app.use(bodyParser.json())
  app.use(auth)
  require('./routes/user')(app)
  require('./routes/auth')(app)
  app.get('/ping', (req, res) => {
    res.send('pong')
  })
  app = require('http').createServer(app)
  await app.listen(5001)
  console.log('server started at port 5001')
  // send back closing function
  resolve(async () => {
    await app.close();
    await connection.close()
  })
})