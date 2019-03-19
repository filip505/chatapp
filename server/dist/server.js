"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _http = _interopRequireDefault(require("http"));

var _typeorm = require("typeorm");

var _middleware = require("./middleware");

var _routes = _interopRequireDefault(require("./routes"));

var _fixtures = _interopRequireDefault(require("./fixtures"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(port) {
    var app, server;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _typeorm.getConnection)().synchronize(true);

          case 2:
            _fixtures.default.init(); // if (process.env.NODE_ENV === 'test') {
            // }


            app = (0, _express.default)();
            app.disable('etag');
            app.use((0, _cors.default)());
            app.use(_bodyParser.default.json());
            app.use(_middleware.authMiddleware);
            app.use(_routes.default);
            app.get('ping', function (req, res) {
              res.send('pong');
            });
            app = _http.default.createServer(app);
            _context.next = 13;
            return app.listen(port);

          case 13:
            server = _context.sent;

            server.closeAll = function () {
              console.log('close all');
              connection.close();
              server.close();
              socket.close();
            };

            console.log('___________________________');
            console.log('server started at port' + port);
            console.log('server env ' + process.env.NODE_ENV);
            return _context.abrupt("return", server);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=server.js.map