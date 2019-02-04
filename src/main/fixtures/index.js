import v1 from 'uuid';
import { getRepository } from 'typeorm'

export default class Fixtures {

  async init() {
    await this.createUser()
  }

  async createUser(
    email = 'test',
    password = 'test',
    firstName = 'test',
    lastName = 'test',
    id = v1(),
    tokens = [],
  ) {
    return await getRepository('person').save({
      id,
      email,
      password,
      firstName,
      lastName
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