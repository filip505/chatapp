import { getRepository } from 'typeorm'

class ConversationService {
  conversationRepository = getRepository('conversation')
  messageRepository = getRepository('message')
  personRepository = getRepository('person')
  subjectRepository = getRepository('subject')

  async getOrCreateConversation(number, user) {
    const companion = await this.personRepository.findOne({ number })
    if (!companion) throw { status: 404, body: 'companion not found' }

    const subject = await this.subjectRepository.findOne({
      where: {
        companion,
        person: user
      },
      relations: ['conversation'],
      limit: 1
    })

    let conversation
    if (subject) {
      console.log('getting conversation', subject.conversation)
      conversation = subject.conversation
    }
    else {
      console.log('creating conversation')
      conversation = await this.conversationRepository.save({
        updatedAt: new Date().toLocaleString(),
        subjects: [
          {
            companion,
            person: user
          },
          {
            person: companion,
            companion: user
          }
        ],
      })
    }
    
    conversation.companionId = companion.id
    conversation.companion = companion
    return conversation
  }

  async getConversations(user) {
    let subjects = await this.subjectRepository.find({
      where: {
        person: user
      },
      relations: ['companion', 'conversation']
    })
    const conversations = subjects.map((subject) => {
      const response = subject.conversation
      response.companion = subject.companion
      response.companionId = subject.companion.id
      return response
    }).filter((conversation) => conversation.lastMessageId)
  
    return conversations
  }
}

export default new ConversationService()