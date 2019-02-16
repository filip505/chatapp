import { v1 } from 'uuid'
import { getRepository } from 'typeorm'

export default function (app) {
  const personRepository = getRepository('person')

  app.get('/user', async (req, res) => {
    const users = await personRepository.find();
    res.send(users)
  })

  app.post('/user', (req, res) => {
    req.body.id = uuid()
    personRepository.save(req.body)
    res.send('post')
  })

  app.get('/user/:email', async (req, res) => {
    const user = await personRepository.findOne({email: req.params.email})
    res.send(user)
  })

};