export default {
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
    }
  },
  relations: {
    sender: {
      target: 'person',
      type: 'one-to-one',
      joinColumn: true
    },
    receiver: {
      target: 'person',
      type: 'one-to-one',
      joinColumn: true
    }
  }
};
