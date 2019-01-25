const uuid = require('uuid/v1')
const typeorm = require("typeorm")
const http = require('http-status-codes')
const connection = typeorm.getConnection()
const personRepository = connection.getRepository('person')
const validate = require('./../middleware/dtoValidator')
const signUpSchema = require('./../dto/signInSchema')

module.exports = function (app) {
  app.post('/login', (req, res) => {

  })
  app.post('/signin',
    validate(signUpSchema),
    async (req, res, next) => {
      req.body.id = uuid()
      console.log('body', req.body)
      const user = await personRepository.save(req.body)
      res.status(http.CREATED).send(user)
    })
  app.get('/ping', (req, res) =>{
    res.send('pong')
  })
}