const uuid = require('uuid/v1')
const typeorm = require("typeorm")
const http = require('http-status-codes')
const connection = typeorm.getConnection()
const personRepository = connection.getRepository('person')

module.exports = function (app) {
  app.post('/login', (req, res) => {
    
  }),
  app.post('/singin', (req, res) => {
    req.body.id = uuid()
    personRepository.save(req.body)
    res.status(http.CREATED)
  })
}