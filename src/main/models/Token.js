import Person from './User'
export default {
  name: "token",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    personId: {
      type: "uuid"
    }
  },
  relations: {
    person: {
      target: 'person',
      type: 'many-to-one',
      joinColumn: true,
      cascade: true
    }
  }
};