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
            switch (msg.type) {
              case 'CONNECT':
                this.connections[token.personId] = connection
                break
              case 'DISCONNECT':
                console.log('prije', this.connections[token.personId])
                delete this.connections[token.personId]
                console.log('poslije', this.connections[token.personId])
                break
            }
          } catch (error) {
            console.log('error', connection)
            connection.send(JSON.stringify({ error: 'invalid token' }))
            connection.close()
          }
        }
      });
      connection.on('close', function (connection, bla, fllff) {
        console.log('connection closed')
      });
    })

  }

  sendMessage = (msg) => new Promise((resolve, reject) => {
    console.log('this.connections[msg.receiverId]', this.connections[msg.receiverId])
    this.connections[msg.receiverId].send(JSON.stringify(msg))
  });

}

export default new Socket()