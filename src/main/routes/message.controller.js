import v1 from 'uuid'
import http from 'http-status-codes'
import { getRepository } from 'typeorm'
import { oauthMiddleware } from './../middleware'
import { dtoValidatorMiddleware as validate } from '../middleware'
import { signInSchema, loginSchema } from '../dto'

export default function (app) {

  const messageRepository = getRepository('message')

  app.post('/message', oauthMiddleware('user'),
    async (req, res) => {
      const store = { ...req.body, id: v1(), senderId: req.user.id }
      await messageRepository.save(store)
      res.send(store)
    })
}
