import v1 from 'uuid'
import http from 'http-status-codes'
import { getRepository } from 'typeorm'
import { dtoValidatorMiddleware as validate } from '../middleware'
import { signInSchema, loginSchema } from '../dto'

export default function (app) {

  const personRepository = getRepository('person')
  const tokenRepository = getRepository('token')

  app.post('/login', validate(loginSchema),
    async (req, res) => {
      const { password, email, key } = req.body
      const user = await personRepository.findOne({ email, password })
      console.log('log', { ...user, key })
      if (user) {
        const token = await tokenRepository.save({ id: v1(), personId: user.id })
        user.key = key
        await personRepository.save({ ...user, key })
        res.send({ user, token })
      }
      else {
        res.status(403).send('invalid user or password')
      }
    })

  app.post('/signin',
    validate(signInSchema),
    async (req, res) => {
      req.body.id = v1()
      const user = await personRepository.save(req.body)
      res.status(http.CREATED).send(user)
    })

  app.get('/ping', (req, res) => {
    res.send('pong')
  })
}
