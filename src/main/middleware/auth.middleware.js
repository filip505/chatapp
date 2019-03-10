import authService from '../services/auth.service'

const authMiddleware = async function (req, res, next) {
  const token = req.headers.token
  req.user = await authService.validateToken(token)
  next();
}

export default authMiddleware