module.exports = {
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
    pass: {
      type: "varchar"
    },
    name: {
      type: "varchar"
    }
  }
};