import { Router } from 'express'
import auth from './auth.controller'
import message from './message.controller'
import user from './user.controller'
import conversation from './conversation.controller'
import { errorHandler } from '../util'

const router = Router()
router.use('/auth', auth)
router.use('/user', user)
router.use('/message', message)
router.use('/conversation', conversation)

export default router

