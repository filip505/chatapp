import { EntitySchema } from 'typeorm'

export default new EntitySchema({
  name: "person",
  table: {
    name: "person"
  },
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    firstName: {
      name: 'firstname',
      type: "varchar"
    },
    lastName: {
      name: 'lastname',
      type: "varchar"
    },
    key: {
      type: "varchar"
    },
    password: {
      type: "varchar"
    },
    email: {
      type: "varchar"
    },
    number: {
      type: "varchar"
    },
    image: {
      type: "varchar"
    }
  },
  relations: {
    tokens: {
      target: 'token',
      type: 'one-to-many',
      inverseSide: 'person',
      cascade: true
    },
    subjects: {
      target: 'subject',
      type: 'one-to-many',
      inverseSide: 'person',
      cascade: true
    },
    companions: {
      target: 'subject',
      type: 'one-to-many',
      inverseSide: 'companion',
      cascade: true
    }
  }
});
