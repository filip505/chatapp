const prefix = '/user'
const uuid = require('uuid/v1')
const typeorm = require("typeorm")
const connection = typeorm.getConnection()
const personRepository = connection.getRepository('person')

module.exports = function (app) {

  app.get(prefix, async (req, res) => {
    const users = await personRepository.find();
    console.log(users)
    res.send({ok:'ok'})
  })

  app.post(prefix, (req, res) => {
    console.log('request', req.body)
    req.body.id = uuid()
    personRepository.save(req.body)
    res.send('post')
  })
  
};