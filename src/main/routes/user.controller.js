import userService from '../services/user.service'
import { Router } from 'express'
import { errorHandler } from '../util'

const router = Router()

router.get('/:email', async (req, res) => {
  const user = await userService.findUserByEmail(req.params.email)
  res.send(user)
})

export default router