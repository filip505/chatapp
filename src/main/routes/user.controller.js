import userService from '../services/user.service'
import { Router } from 'express'
import { errorHandler } from '../util'

const router = Router()

router.get('/:number', async (req, res) => {
  const user = await userService.findUserByNumber(req.params.number)
  res.send(user)
})

export default router