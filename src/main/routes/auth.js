import v1 from 'uuid'
import { getConnection } from 'typeorm'
import http from 'http-status-codes'
import validate from '../middleware/dtoValidator'
import { signInSchema, loginSchema } from '../dto'

export default function (app) {
  const personRepository = getConnection().getRepository('person')

  app.post('/login', validate(loginSchema),
    (req, res) => {
      const {password, email} = req.body
      const user = personRepository.findOne({email, email})
      console.log(user)
    })
  app.post('/signin',
    validate(signInSchema),
    async (req, res, next) => {
      req.body.id = v1()
      console.log('body', req.body)
      const user = await personRepository.save(req.body)
      res.status(http.CREATED).send(user)
    })
  app.get('/ping', (req, res) => {
    res.send('pong')
  })
}
