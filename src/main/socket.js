import { server as WebSocketServer } from 'websocket'
import { getRepository } from 'typeorm'
import http from 'http'

class Socket {

  userRepository = getRepository('person')
  tokenRepository = getRepository('token')
  connection = null

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

      connection.on('message', async (message) => {
        if (message.type === 'utf8') {
          try {
            const msg = JSON.parse(message.utf8Data)
            const token = await this.tokenRepository.findOne({ id: msg.token })
            request.personId = token.personId
            this.connections[token.personId] = connection
          } catch (error) {
            console.log('error')
            connection.send(JSON.stringify({ error: 'invalid token' }))
            connection.close()
          }
        }
      });
      connection.on('close', (connection) => {
        delete this.connections[request.personId]
        console.log('connection removed', request.personId)
      });
    })

  }

  sendMessage = (msg) => new Promise((resolve, reject) => {
    this.connections[msg.receiverId].send(JSON.stringify(msg))
  });

}

export default new Socket()