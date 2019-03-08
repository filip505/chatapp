import { EntitySchema } from 'typeorm'

export default new EntitySchema({
  name: "token",
  table: {
    name: "token"
  },
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
      inverseSide: 'tokens',
      //joinColumn: true
    }
  }
});