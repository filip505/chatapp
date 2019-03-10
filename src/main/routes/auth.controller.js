import http from 'http-status-codes'
import { getRepository } from 'typeorm'
import { dtoValidatorMiddleware as validate } from '../middleware'
import { signInSchema, loginSchema } from '../dto'
import authService from '../services/auth.service';
import { errorHandler } from '../util'
import { Router } from 'express'

const router = Router()

router.post('/login', validate(loginSchema),
  errorHandler(async (req, res) => {
    const { password, email, key, oneSignalId } = req.body
    const response = await authService.login(password, email, key, oneSignalId)
    res.send(response)
  }))

router.post('/signin', validate(signInSchema),
  errorHandler(async (req, res) => {
    const user = await authService.signUp(req.body)
    res.status(http.CREATED).send(user)
  }))

router.get('/ping', (req, res, next) => {
  res.send('pong')
})

export default router