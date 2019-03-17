"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _onesignalNode = _interopRequireDefault(require("onesignal-node"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OneSignalService =
/*#__PURE__*/
function () {
  function OneSignalService() {
    _classCallCheck(this, OneSignalService);

    _defineProperty(this, "personRepository", (0, _typeorm.getRepository)('person'));

    this.myClient = new _onesignalNode.default.Client({
      app: {
        appAuthKey: 'MDI4MDAwODUtZjQ2NC00MGFmLTlkYTctNWRhMzlkMDliMjY0',
        appId: '0596fb61-668e-4d9a-ba3a-3d5a3de4e16a'
      }
    });
  }

  _createClass(OneSignalService, [{
    key: "sendNotification",
    value: function () {
      var _sendNotification = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(message, user) {
        var receiver, firstNotification;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.personRepository.findOne({
                  id: message.receiverId
                });

              case 2:
                receiver = _context.sent;
                console.log('sending notification', user.oneSignalId);
                firstNotification = new _onesignalNode.default.Notification({
                  contents: {
                    en: 'new message from ' + user.firstName
                  },
                  include_player_ids: [receiver.oneSignalId]
                });
                this.myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
                  if (err) {
                    console.log('Something went wrong...');
                  } else {
                    console.log(data);
                  }
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sendNotification(_x, _x2) {
        return _sendNotification.apply(this, arguments);
      }

      return sendNotification;
    }()
  }]);

  return OneSignalService;
}();

var _default = new OneSignalService();

exports.default = _default;
//# sourceMappingURL=one.signal.service.js.map