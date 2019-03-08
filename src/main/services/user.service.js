import { getRepository } from 'typeorm'

class UserService {
  personRepository = getRepository('person')

  async findUserByEmail(email) {
    const user = await this.personRepository.findOne({ email })
    if (!user) throw { status: 404, body: 'user not found' }
    return user
  }
}

export default new UserService()