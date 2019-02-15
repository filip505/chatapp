import v1 from 'uuid';
import { getRepository } from 'typeorm'

export default class Fixtures {

  async init() {
    await this.createUser({
      email: 'test',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
      id: v1(),
      tokens: [],
    })
    await this.createUser({
      email: 'test1',
      password: 'test1',
      firstName: 'test1',
      lastName: 'test1',
      id: v1(),
      tokens: [],
    })
  }

  async createUser(user) {
    return await getRepository('person').save(user)
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