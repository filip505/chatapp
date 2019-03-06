import { server as WebSocketServer } from 'websocket'
import { getRepository } from 'typeorm'
import http from 'http'

export default class {

  userRepository = getRepository('person')
  tokenRepository = getRepository('token')
  connection = null

  sendMessage = (msg) => {
    return new Promise((resolve, reject) => {
      //console.log('msg', msg)
      // try {
      //   this.connections[msg.senderId].send(JSON.stringify(msg))
      // } catch (error) {
      //   console.log('error', 'faild delivered message to sender id: '+senderId)
      // }
      try {
        this.connections[msg.receiverId].send(JSON.stringify(msg))
      } catch (error) {
        console.log('error ', 'faild delivered message to sender id: ' + receiverId)
      }
    });
  }

  constructor() {
    this.connections = {}
    const server = http.createServer(function (request, response) {
      // process HTTP request. Since we're writing just WebSockets
      // server we don't have to implement anything.
    });
    this.connection = server.listen(1337, function () { });

    const wsServer = new WebSocketServer({
      httpServer: server
    });

    wsServer.on('request', (request) => {
      var connection = request.accept(null, request.origin);

      // This is the most important callback for us, we'll handle
      // all messages from users here.
      connection.on('message', async (message) => {
        if (message.type === 'utf8') {
          try {
            const msg = JSON.parse(message.utf8Data)
            const token = await this.tokenRepository.findOne({ id: msg.token })
            this.connections[token.personId] = connection

            for (let key in this.connections) {
              console.log(key)
            }

          } catch (error) {
            console.log('error', connection)
            connection.send(JSON.stringify({ error: 'invalid token' }))
            connection.close()
          }
        }
      });
      connection.on('close', function (connection) {
        console.log('connection closed')
      });
    })
  }

}
