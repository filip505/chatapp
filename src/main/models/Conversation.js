import { EntitySchema } from 'typeorm'

export default new EntitySchema({
  name: "conversation",
  columns: {
    id: {
      generated: "uuid",
      primary: true,
      type: "uuid",
    },
    lastMessageId: {
      name: 'lastMessageId',
      type: 'uuid'
    },
    cretedAt: {
      name: 'created_at',
      type: "timestamp"
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp'
    }
  },
  relations: {
    messages: {
      target: 'message',
      type: 'one-to-many',
      inverseSide: 'conversation',
      cascade: true
      //joinColumn: true
    },
    subjects: {
      target: 'subject',
      type: 'one-to-many',
      inverseSide: 'conversation',
      cascade: true
    }
  }
});
