export default {
  name: "person",
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
    password: {
      type: "varchar"
    },
    email: {
      type: "varchar"
    }
  },
  relations: {
    tokens: {
      target: 'token',
      type: 'one-to-many',
      cascade: true
    }
  }
};
