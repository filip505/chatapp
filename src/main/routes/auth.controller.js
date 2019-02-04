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
      const { password, email } = req.body
      const user = await personRepository.findOne({ email, password })
      console.log('tugledaj', { email, password })
      if (user) {
        const token = await tokenRepository.save({ id: v1(), personId: user.id })
        res.send({ user, token })
      }
      else {
        res.status(403).send('invalid user or password')
      }
    })

  app.post('/signin',
    validate(signInSchema),
    async (req, res) => {
      console.log('bok2 bok2')
      req.body.id = v1()
      console.log('body', req.body)
      const user = await personRepository.save(req.body)
      res.status(http.CREATED).send(user)
    })

  app.get('/ping', (req, res) => {
    res.send('pong')
  })
}
