import { oauthMiddleware } from './../middleware'
import { errorHandler } from './../util'
import conversationService from '../services/conversation.service'
import { Router } from 'express'

const router = Router()

router.post('/:number', oauthMiddleware('user'),
  errorHandler(async (req, res) => {
    const user = req.user
    const number = req.params.number
    const conversation = await conversationService.getOrCreateConversation(number, user)
    res.send(conversation)
  }))

router.get('', oauthMiddleware('user'), async (req, res) => {
  const user = req.user
  const subjects = await conversationService.getConversations(user)
  res.send(subjects)
})

export default router