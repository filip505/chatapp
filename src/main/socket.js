import { server as WebSocketServer } from 'websocket'
import http from 'http'


export default class {

  sendMessage = (msg, receiverId, senderId) => {
    return new Promise((resolve, reject) => {
      this.connections[receiverId].send(msg)
    });
  }

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
      connection.on('message', (message) => {
        if (message.type === 'utf8') {
          // connection.send(message.utf8Data)
          const msg = JSON.parse(message.utf8Data)
          this.connections[msg.token] = connection
        }
      });

      connection.on('close', function (connection) {
        // close user connection
      });
    })
  }

}
