import { getRepository } from 'typeorm'

const authMiddleware = async function (req, res, next) {
  try {
    const token = req.headers.token
    const tokenDb = await getRepository('token').findOne({ id: token })
    req.user = await getRepository('person').findOne({ id: tokenDb.personId })
    req.user.role = 'user'
  }
  catch(exceptin){console.log('token', 'invalid')}
  
  next();
}

export default authMiddleware