module.exports = {
  name: "token",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    person: {
      type: "uuid",
    }
  }
};