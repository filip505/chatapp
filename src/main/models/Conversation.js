export default {
  name: "message",
  columns: {
    id: {
      generated: "uuid",
      primary: true,
      type: "uuid",
    },
    person1: {
      name: 'person_1',
      type: "varchar"
    },
    person2: {
      name: 'person_@',
      type: "uuid"
    },
    lastMessage: {
      name: 'created_at',
      type: "uuid"
    },
    cretedAt: {
      name: 'person_@',
      type: "uuid"
    },
    updatedAt: {
      name: 'last_message',
      type: "uuid"
    }
  },
  // relations: {
  //   person1: {
  //     target: 'person',
  //     type: 'one-to-one',
  //     joinColumn: true
  //   },
  //   person2: {
  //     target: 'person',
  //     type: 'one-to-one',
  //     joinColumn: true
  //   }
  // }
};
