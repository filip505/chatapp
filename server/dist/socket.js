"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _websocket = require("websocket");

var _typeorm = require("typeorm");

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Socket = function Socket() {
  var _this = this;

  _classCallCheck(this, Socket);

  _defineProperty(this, "userRepository", (0, _typeorm.getRepository)('person'));

  _defineProperty(this, "tokenRepository", (0, _typeorm.getRepository)('token'));

  _defineProperty(this, "connection", null);

  _defineProperty(this, "sendMessage", function (msg) {
    return new Promise(function (resolve, reject) {
      _this.connections[msg.receiverId].send(JSON.stringify(msg));
    });
  });

  this.connections = {};

  var server = _http.default.createServer(function (request, response) {// process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
  });

  this.connection = server.listen(1337, function () {});
  var wsServer = new _websocket.server({
    httpServer: server
  });
  wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    connection.on('message',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(message) {
        var msg, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(message.type === 'utf8')) {
                  _context.next = 15;
                  break;
                }

                _context.prev = 1;
                msg = JSON.parse(message.utf8Data);
                _context.next = 5;
                return _this.tokenRepository.findOne({
                  id: msg.token
                });

              case 5:
                token = _context.sent;
                request.personId = token.personId;
                _this.connections[token.personId] = connection;
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);
                console.log('error');
                connection.send(JSON.stringify({
                  error: 'invalid token'
                }));
                connection.close();

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 10]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    connection.on('close', function (connection) {
      delete _this.connections[request.personId];
      console.log('connection removed', request.personId);
    });
  });
};

var _default = new Socket();

exports.default = _default;
//# sourceMappingURL=socket.js.map