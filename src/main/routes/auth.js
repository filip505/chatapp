// const uuid = require('uuid/v1')
// const typeorm = require("typeorm")
// const http = require('http-status-codes')
// const connection = typeorm.getConnection()
// const personRepository = connection.getRepository('person')
// const validate = require('../middleware/dtoValidator')
// const signUpSchema = require('../dto/signInSchema')

import v1 from 'uuid'
import { getConnection } from 'typeorm'
import http from 'http-status-codes'
import validate from '../middleware/dtoValidator'
import { SignInSchema } from '../dto'



export default function (app) {
  const personRepository = getConnection().getRepository('person')
  
  app.post('/login', (req, res) => {

  })
  app.post('/signin',
    validate(SignInSchema),
    async (req, res, next) => {
      req.body.id = v1()
      console.log('body', req.body)
      const user = await personRepository.save(req.body)
      res.status(http.CREATED).send(user)
    })
  app.get('/ping', (req, res) =>{
    res.send('pong')
  })
}
