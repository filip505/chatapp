import { getRepository } from 'typeorm'

const AuthService = new class {
  constructor() {
    this.userRepository = getRepository('person')
  }

  authenticate = (email, password) => {
    return userRepository.findOne({ email, password })
  }

  validateToken = token => {
    return userRepository.find()
  }
}

export default AuthService