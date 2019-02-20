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
      image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
      number: '+4915',
      tokens: [],
    })
    await this.createUser({
      email: 'test1',
      password: 'test1',
      firstName: 'test1',
      lastName: 'test1',
      id: v1(),
      image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
      number: '+491',
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