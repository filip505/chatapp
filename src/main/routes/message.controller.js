import v1 from 'uuid'
import http from 'http-status-codes'
import { getRepository } from 'typeorm'
import { oauthMiddleware } from './../middleware'
import { dtoValidatorMiddleware as validate } from '../middleware'
import { signInSchema, loginSchema } from '../dto'
import { unpack, errorHandler } from './../util'
export default function (app, sendMessage) {

  const messageRepository = getRepository('message')
  const conversationRepository = getRepository('conversation')
  const subjectRepository = getRepository('subject')
  const personRepository = getRepository('person')
  const tokenRepository = getRepository('token')


  app.post('/message', oauthMiddleware('user'),
    errorHandler(async (req, res) => {
      const { user, body } = req
      const { conversationId, number, text } = body
      const date = new Date().format("YYYY-MM-DD HH:mm")

      const receiver = await personRepository.findOne({ number })
      if (!receiver) throw { status: 404, body: 'invalid receiver number' }

      let conversation = await conversationRepository.findOne({ id: conversationId })
      if (!conversation) throw { status: 404, body: 'invalid conversation id' }

      let message = { receiverId: receiver.id, text, senderId: user.id }
      message = await messageRepository.save({ ...message, conversation, createdAt: date })
      console.log('MESSAGELOG',message)
      conversation.lastMessageId = message.id
      await conversationRepository.save(conversation)

      delete message.conversation
      sendMessage(message)
      res.send(message)
    })
  )

  app.get('/message/:conversationId', oauthMiddleware('user'),
    errorHandler(async (req, res) => {
      const conversationId = req.params.conversationId
      const user = req.user

      const subject = await subjectRepository.find({
        where: {
          conversationId,
          person: user
        },
      })
      if (!subject) throw { status: 404, body: 'invalid conversation id' }

      const messages = await messageRepository.find({
        where: {
          conversationId,
          receiverId: user.id
        }
      })

      res.send(messages)
    })
  )
}
