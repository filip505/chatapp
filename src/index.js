const express = require('express')
const bodyParser = require('body-parser')
const auth = require('middleware/auth')
const User = require('models/User')
const Test = require('models/Token')
const typeorm = require("typeorm");
const { createConnection } = require('typeorm')
// const util = require('util')
//connection.query = util.promisify(connection.query)

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
  migrations: ["./migration/*.js"],
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
  const fixtures = require('fixtures')(connection)
  if (process.env.NODE_ENV === 'dev') {
    await connection.runMigrations()
    for (let i = 0; i < config.entities.length; i++) {
      const item = config.entities[i].options.name
      await connection.query('delete from ' + item)
    }
    await fixtures.init()
  }
  else {
    await connection.runMigrations()
  }

  let app = express()
  app.use(bodyParser.json())
  app.use(auth)
  require('./routes/user')(app)
  require('./routes/auth')(app)

  app = require('http').createServer(app)
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