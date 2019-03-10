import v1 from 'uuid';
import { getRepository } from 'typeorm'

class Fixtures {

  async init() {
    await this.createUser({
      email: 'test',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
      image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
      number: '+4915',
      key: 'bla',
      oneSignalId: '241756c8-4264-11e9-b210-d663bd873d93',
      tokens: [{}],
    })
    await this.createUser({
      email: 'test1',
      password: 'test1',
      firstName: 'test1',
      lastName: 'test1',
      image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
      key: 'bla',
      oneSignalId: '241756c8-4264-11e9-b210-d663bd873d93',
      number: '+491',
      tokens: [],
    })
    await this.createUser({
      email: 'test2',
      password: 'test2',
      firstName: 'test2',
      lastName: 'test2',
      image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
      key: 'bla',
      oneSignalId: '241756c8-4264-11e9-b210-d663bd873d93',
      number: '+4914',
      tokens: [],
    })
  }

  async createUser(user) {
    return await getRepository('person').save(user)
  }

}

export default new Fixtures()