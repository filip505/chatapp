import '@babel/polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import  { getConnection } from 'typeorm'
import { authMiddleware, oauthMiddleware } from './middleware'
import routers from './routes'
import fixtures from './fixtures'
import cors from 'cors'

export default async (port) => {

  //await connection.runMigrations()

  // await getConnection().synchronize(true);
  // fixtures.init()
  // if (process.env.NODE_ENV === 'test') {


  // }
  
  let app = express()
  app.disable('etag');
  app.use(cors())
  app.use(bodyParser.json())
  app.use(authMiddleware)
  app.use(routers)
  app = http.createServer(app)

  const server = await app.listen(port)

  server.closeAll = () => {
    console.log('close all')
    connection.close()
    server.close()
    socket.close()
  }

  console.log('___________________________')
  console.log('server started at port' + port)
  console.log('server env ' + process.env.NODE_ENV)
  return server
}