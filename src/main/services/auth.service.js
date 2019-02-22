import { getRepository } from 'typeorm'
import { v1 } from 'uuid'

class AuthService {

  constructor() {
    this.personRepository = getRepository('person')
    this.tokenRepository = getRepository('token')
  }

  async login(email, password, key) {
    const user = await this.personRepository.findOne({ email, password })
    delete user.password;
    if (user) {
      const token = await this.tokenRepository.save({ id: v1(), person: user })
      // const load = await this.tokenRepository.findOne({id: token.id}, { relations: ["person"] })
      // await this.personRepository.save({ ...user, key })
      return { user: {...user, token: token.id }}
    }
    else {
      throw { status: 403, body: 'invalid user or password' }
    }
  }

  validateToken = token => {
    return userRepository.find()
  }
}

export default AuthService