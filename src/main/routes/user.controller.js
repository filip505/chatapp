import { v1 } from 'uuid'
import { getRepository } from 'typeorm'

export default function (app) {
  const personRepository = getRepository('person')

  app.get('/user', async (req, res) => {
    console.log('getUSers')
    const users = await personRepository.find();
    res.send(users)
  })

  app.post('/user', (req, res) => {
    console.log('request', req.body)
    req.body.id = uuid()
    personRepository.save(req.body)
    res.send('post')
  })

  app.get('/user/:id', async (req, res) => {
    const user = await personRepository.findOne({id: req.params.id})
    res.send(user)
  })

};