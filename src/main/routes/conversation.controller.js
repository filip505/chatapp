import { getRepository, createQueryBuilder } from 'typeorm'
import { oauthMiddleware } from './../middleware'
import { errorHandler } from './../util'

export default function (app) {
  const conversationRepository = getRepository('conversation')
  const messageRepository = getRepository('message')
  const personRepository = getRepository('person')
  const subjectRepository = getRepository('subject')

  //create conversation
  app.post('/conversation/:number', oauthMiddleware('user'),
    errorHandler(async (req, res) => {
      const user = req.user
      const companion = await personRepository.findOne({ number: req.params.number })
      if (!companion) throw { status: 404, body: 'companion not found' }

      const subject = await subjectRepository.findOne({
        where: {
          companion,
          person: user
        },
        relations: ['conversation'],
        limit: 1
      })

      let conversation
      if (subject) {
        conversation = subject.conversation
      }
      else {
        conversation = await conversationRepository.save({
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
      res.send(conversation)
    }))

  app.get('/conversation/:id/:skip/:take', async (req, res) => {
    const { id, skip, take } = req.params
    //const messages = await messageRepository.query(`select * from message where "conversationId" = '${conversationId}' order by "createdAt" desc`)
    const messages = await messageRepository.find({
      where: {
        conversationId: id
      },
      // order: {
      //   createdAt: "DESC"
      // },
      // skip,
      // take
    })

    res.send(messages)
  })

  app.get('/conversation', oauthMiddleware('user'), async (req, res) => {
    const user = req.user
    let subjects = await subjectRepository.find({
      where: {
        person: user
      },
      relations: ['companion', 'conversation']
    })
    
    subjects = subjects.filter((subject) => subject.conversation.lastMessageId != null)

    // const conversations = await conversationRepository.find({
    //   where: {
    //     id: item.conversationId
    //   }
    // })
    // const conversations = await conversationRepository.find({
    //   where: {
    //     subjects
    //   }
    // })
    // const conversations = await conversationRepository.query(`select * from conversation where person_1='${user.id}' or person_2='${user.id}' order by updated_at desc`)
    // for (let element of conversations) {
    //   element.lastMessage = await messageRepository.findOne({ id: element.last_message_id })
    //   const id = (req.user.id == element.person_1)? element.person_2: element.person_1
    //   delete element.person_1
    //   delete element.person_2
    //   element.user = await personRepository.findOne({ id })
    // }
    res.send(subjects)//.orderBy("updated_at", 'DESC')
  })
}