import { server as WebSocketServer } from 'websocket'
import { getRepository } from 'typeorm'
import http from 'http'

export default class {

  sendMessage = (msg) => {
    return new Promise((resolve, reject) => {
      try {
        this.connections[msg.receiverId].send(msg.text)
      } catch (error) {
        console.log('error', error)
      }
    });
  }

  userRepository = getRepository('person')
  tokenRepository = getRepository('token')

  constructor() {
    this.connections = {}
    const server = http.createServer(function (request, response) {
      // process HTTP request. Since we're writing just WebSockets
      // server we don't have to implement anything.
    });
    server.listen(1337, function () { });

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
