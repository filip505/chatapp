import v1 from 'uuid';
import { getRepository } from 'typeorm'
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
//   }–––

// }

export default class Fixtures {

  async init() {
    await this.createUser()
  }

  async createUser(
    tokens = [],
    firstName = 'test',
    lastName = 'test',
    name = 'test',
    pass = 'test',
    id = v1(),
  ) {
    tokens.forEach(el => el.personId = id)
    return await getRepository('person').save({
      id,
      firstName,
      lastName,
      name,
      pass,
      tokens
    })
  }

  async createToken(
    user,
    id = v1(),
  ) {
    return await getRepository('token').save({
      id,
      user
    })
  }

}