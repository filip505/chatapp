import v1 from 'uuid';

// export default function (connection) {
//   return {
//     init: async function () {
//       await this.createUser()
//     },
//     createUser: async function (
//       firstName = 'test',
//       lastName = 'test',
//       name = 'test',
//       pass = 'test'
//     ) {
//       await connection.getRepository('person').save({
//         id: v1(),
//         firstName,
//         lastName,
//         name,
//         pass
//       })
//     }
//   }

// }

export default class Fixtures {
  constructor(connection) {
    this.connection = connection
  }

  async init() {
    await this.createUser()
  }

  async createUser(
    firstName = 'test',
    lastName = 'test',
    name = 'test',
    pass = 'test') {
    await this.connection.getRepository('person').save({
      id: v1(),
      firstName,
      lastName,
      name,
      pass
    })
  }
}