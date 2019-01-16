const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./middleware/auth')
const { createConnection } = require('typeorm')
const User = require('./models/User')
const Test = require('./models/Token')
const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;
const fixtures = require('./fixtures/fixtures')

const config = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "node",
  password: "node",
  database: "node",
  synchronize: false,
  logging: true,
  migrations: ["migration/*.ts"],
  cli: {
    "migrationsDir": "migration"
  },
  entities: [
    new EntitySchema(User),
    new EntitySchema(Test)
  ]
}

createConnection(config).then(async (connection) => {

  if (process.env.NODE_ENV === 'dev') {
    await connection.runMigrations()
    config.entities.forEach(async (item) => {
      console.log('ok1')
      await connection.query('delete from ' + item.options.name)
      console.log('delete')
    })
    // console.log('ok')
    //fixtures.init(connection)
  }
  else {
    connection.runMigrations()
  }
  console.log('ok2')
  const app = express()

  app.use(bodyParser.json())
  app.use(auth)
  require('./routes/user')(app)

  app.get('/ping', (req, res) => {
    res.send({ status: 20 })
  })

  app.post('/post', (req, res) => {
    console.log(req.body)
    res.send({ status: 20 })
  })
  console.log('delete22')
  app.listen(5001, () => {
    console.log('listening on port 5001')
  })
}).catch((error) => console.log(error));