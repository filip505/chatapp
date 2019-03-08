import { EntitySchema } from 'typeorm'

export default new EntitySchema({
  name: "message",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    text: {
      name: 'text',
      type: "varchar"
    },
    senderId: {
      name: 'senderId',
      type: "uuid"
    },
    receiverId: {
      name: 'receiverId',
      type: "uuid"
    },
    conversationId: {
      name: 'conversationId',
      type: "uuid"
    },
    createdAt: {
      name: 'createdAt',
      type: 'timestamp'
    },
  },
  relations: {
    conversation: {
      target: 'conversation',
      type: 'many-to-one',
      inverseSide: 'messages',
      //joinColumn: true
    },
  }
});
