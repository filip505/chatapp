export default {
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