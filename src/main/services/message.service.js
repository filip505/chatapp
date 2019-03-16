import { getRepository } from 'typeorm'

class MessageService {
  messageRepository = getRepository('message')
  subjectRepository = getRepository('subject')
  personRepository = getRepository('person')
  conversationRepository = getRepository('conversation')

  async createMessage(conversationId, number, text, user) {
    const date = new Date()//.format("YYYY-MM-DD HH:mm")

    const receiver = await this.personRepository.findOne({ number })
    if (!receiver) throw { status: 404, body: 'invalid receiver number' }

    // let conversation = await this.conversationRepository.findOne({ id: conversationId })
    // if (!conversation) throw { status: 404, body: 'invalid conversation id' }

    const subject = await this.subjectRepository.findOne({
      where: {
        personId: receiver.id,
        conversationId
      },
      relations: ['companion', 'conversation']
    })

    const { conversation } = subject
    if (!subject) throw { status: 404, body: 'invalid conversation id' }

    let message = { receiverId: receiver.id, text, senderId: user.id }
    message = await this.messageRepository.save({ ...message, conversation, createdAt: date })

    conversation.lastMessageId = message.id
    conversation.companionId = user.number

    await this.conversationRepository.save(conversation)
    await this.subjectRepository.save({ ...subject, messageCount: subject.messageCount + 1 })

    return message;
  }

  async getMessages(conversationId, person) {
    const subject = await this.subjectRepository.findOne({
      where: {
        conversationId,
        person
      },
    })

    if (!subject) throw { status: 404, body: 'invalid conversation id' }

    const messages = await this.messageRepository.find({
      where: {
        conversationId,
        receiverId: person.id
      }
    })

    if (messages.length > 0) {
      await this.messageRepository.delete(messages)
      await this.subjectRepository.save({ ...subject, messageCount: 0 })
    }
    return messages
  }
}

export default new MessageService()