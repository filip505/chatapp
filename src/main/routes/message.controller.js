import { oauthMiddleware } from './../middleware'
import { errorHandler } from './../util'
import messageService from '../services/message.service'
import { dtoValidatorMiddleware as validate } from '../middleware'
import { Router } from 'express'
import createMessageShema from '../dto/createMessage'

const router = Router()

router.post('', oauthMiddleware('user'), validate(createMessageShema),
  errorHandler(async (req, res) => {
    const { user, body } = req
    const { conversationId, number, text } = body
    const message = await messageService.createMessage(conversationId, number, text, user);
    //sendMessage(message)
    res.send(message)
  })
)

router.get('/conversation/:conversationId', oauthMiddleware('user'),
  errorHandler(async (req, res) => {
    const user = req.user
    const conversationId = req.params.conversationId
    const messages = await messageService.getMessages(conversationId, user)
    res.send(messages)
  })
)

export default router