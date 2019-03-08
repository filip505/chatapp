import { getRepository } from 'typeorm'
import { v1 } from 'uuid'

class AuthService {
  personRepository = getRepository('person')
  tokenRepository = getRepository('token')

  async login(email, password, key) {
    const user = await this.personRepository.findOne({ email, password })
    if (user) {
      const token = await this.tokenRepository.save({ person: user })
      await this.personRepository.save({ ...user, key })
      return { ...user, token: token.id }
    }
    else {
      throw { status: 403, body: 'invalid user or password' }
    }
  }

  async signUp(user) {
    user.id = v1()
    const exsists = await this.personRepository.findOne({ email: user.email })
    if (exsists) {
      throw { status: 409, body: 'email allready registered' }
    }
    await this.personRepository.save(user)
    return user
  }
  // validateToken = token => {
  //   return userRepository.find()
  // }
}

export default new AuthService()