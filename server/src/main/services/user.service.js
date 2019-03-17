import { getRepository } from 'typeorm'

class UserService {
  personRepository = getRepository('person')

  async findUserByNumber(number) {
    const user = await this.personRepository.findOne({ number })
    if (!user) throw { status: 404, body: 'user not found' }
    return user
  }
}

export default new UserService()