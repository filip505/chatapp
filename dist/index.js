'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _typeorm = require('typeorm');

var _auth = require('./middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _models = require('./models');

var _fixtures = require('./fixtures');

var _fixtures2 = _interopRequireDefault(_fixtures);

var _routes = require('./routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var config = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "node",
  password: "node",
  database: "node",
  synchronize: false,
  logging: true,
  migrations: ["./migration/*.js"],
  cli: {
    "migrationsDir": "migration"
  },
  entities: [new _typeorm.EntitySchema(_models.User), new _typeorm.EntitySchema(_models.Token)]
};

var server = exports.server = new Promise(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
    var connection, app;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _typeorm.createConnection)(config);

          case 2:
            connection = _context.sent;

            // const fixtures = require('fixtures')(connection)
            // if (process.env.NODE_ENV === 'dev') {
            //   await connection.runMigrations()
            //   for (let i = 0; i < config.entities.length; i++) {
            //     const item = config.entities[i].options.name
            //     await connection.query('delete from ' + item)
            //   }
            //   await fixtures.init()
            // }
            // else {
            //   await connection.runMigrations()
            // }

            app = (0, _express2.default)();

            app.use(_bodyParser2.default.json());
            app.use(_auth2.default);
            (0, _routes.auth)(app);
            //user(app)

            app = _http2.default.createServer(app);
            _context.next = 10;
            return app.listen(5001);

          case 10:

            console.log('___________________________');
            console.log('server started at port 5001');
            console.log('server env ' + process.env.NODE_ENV);

            // send back closing function
            resolve({
              app: app,
              connection: connection,
              fixtures: _fixtures2.default
            });

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
//# sourceMappingURL=index.js.map