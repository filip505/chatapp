module.exports = {
  name: "person",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    firstName: {
      type: "varchar"
    },
    lastName: {
      type: "varchar"
    },
    password: {
      type: "varchar"
    },
    email: {
      type: "varchar"
    }
  }
};