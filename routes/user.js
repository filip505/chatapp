const prefix = '/user'
const uuid = require('uuid/v1')
const typeorm = require("typeorm")
const connection = typeorm.getConnection()
const personRepository = connection.getRepository('person')

module.exports = function (app) {

  app.get(prefix, (req, res) => {
    console.log('User', req.user)
    res.send('get')
  })
  app.post(prefix, (req, res) => {
    console.log('request', req.body)
    req.body.id = uuid()
    personRepository.save(req.body)
    res.send('post')
  })
};