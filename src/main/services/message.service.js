import { getRepository } from 'typeorm'

class MessageService{
  messageRepository = getRepository('message')
  subjectRepository = getRepository('subject')
  personRepository = getRepository('person')
  conversationRepository = getRepository('conversation')

  async createMessage(conversationId, number, text, user){
    const date = new Date()//.format("YYYY-MM-DD HH:mm")

    const receiver = await this.personRepository.findOne({ number })
    if (!receiver) throw { status: 404, body: 'invalid receiver number' }

    let conversation = await this.conversationRepository.findOne({ id: conversationId })
    if (!conversation) throw { status: 404, body: 'invalid conversation id' }

    let message = { receiverId: receiver.id, text, senderId: user.id }
    message = await this.messageRepository.save({ ...message, conversation, createdAt: date })
   
    conversation.lastMessageId = message.id
    await this.conversationRepository.save(conversation)

    delete message.conversation
    return message;
  }

  async getMessages(conversationId, person) {
    const subject = await this.subjectRepository.find({
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
    
    return messages
  }
}

export default new MessageService()