import { getRepository } from 'typeorm'

const authMiddleware = async function (req, res, next) {
  const token = req.headers.token
  const tokenDb = await getRepository('token').findOne({ id: token })
  if(tokenDb){
    req.user = await getRepository('person').findOne({ id: tokenDb.personId })
    req.user.role = 'user'
  }
  next();
}

export default authMiddleware