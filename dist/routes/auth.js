'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  var _this = this;

  var personRepository = (0, _typeorm.getConnection)().getRepository('person');

  app.post('/login', function (req, res) {});
  app.post('/signin', (0, _dtoValidator2.default)(_dto.SignInSchema), function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req.body.id = (0, _uuid2.default)();
              console.log('body', req.body);
              _context.next = 4;
              return personRepository.save(req.body);

            case 4:
              user = _context.sent;

              res.status(_httpStatusCodes2.default.CREATED).send(user);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  app.get('/ping', function (req, res) {
    res.send('pong');
  });
};

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _typeorm = require('typeorm');

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _dtoValidator = require('../middleware/dtoValidator');

var _dtoValidator2 = _interopRequireDefault(_dtoValidator);

var _dto = require('../dto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // const uuid = require('uuid/v1')
// const typeorm = require("typeorm")
// const http = require('http-status-codes')
// const connection = typeorm.getConnection()
// const personRepository = connection.getRepository('person')
// const validate = require('../middleware/dtoValidator')
// const signUpSchema = require('../dto/signInSchema')
//# sourceMappingURL=auth.js.map