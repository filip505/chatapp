"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MessageService =
/*#__PURE__*/
function () {
  function MessageService() {
    _classCallCheck(this, MessageService);

    _defineProperty(this, "messageRepository", (0, _typeorm.getRepository)('message'));

    _defineProperty(this, "subjectRepository", (0, _typeorm.getRepository)('subject'));

    _defineProperty(this, "personRepository", (0, _typeorm.getRepository)('person'));

    _defineProperty(this, "conversationRepository", (0, _typeorm.getRepository)('conversation'));
  }

  _createClass(MessageService, [{
    key: "createMessage",
    value: function () {
      var _createMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(conversationId, number, text, user) {
        var date, receiver, subject, conversation, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = new Date(); //.format("YYYY-MM-DD HH:mm")

                _context.next = 3;
                return this.personRepository.findOne({
                  number: number
                });

              case 3:
                receiver = _context.sent;

                if (receiver) {
                  _context.next = 6;
                  break;
                }

                throw {
                  status: 404,
                  body: 'invalid receiver number' // let conversation = await this.conversationRepository.findOne({ id: conversationId })
                  // if (!conversation) throw { status: 404, body: 'invalid conversation id' }

                };

              case 6:
                _context.next = 8;
                return this.subjectRepository.findOne({
                  where: {
                    personId: receiver.id,
                    conversationId: conversationId
                  },
                  relations: ['companion', 'conversation']
                });

              case 8:
                subject = _context.sent;
                conversation = subject.conversation;

                if (subject) {
                  _context.next = 12;
                  break;
                }

                throw {
                  status: 404,
                  body: 'invalid conversation id'
                };

              case 12:
                message = {
                  receiverId: receiver.id,
                  text: text,
                  senderId: user.id
                };
                _context.next = 15;
                return this.messageRepository.save(_objectSpread({}, message, {
                  conversation: conversation,
                  createdAt: date
                }));

              case 15:
                message = _context.sent;
                conversation.lastMessageId = message.id;
                conversation.companionId = user.number;
                _context.next = 20;
                return this.conversationRepository.save(conversation);

              case 20:
                _context.next = 22;
                return this.subjectRepository.save(_objectSpread({}, subject, {
                  messageCount: subject.messageCount + 1
                }));

              case 22:
                return _context.abrupt("return", message);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createMessage(_x, _x2, _x3, _x4) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
  }, {
    key: "getMessages",
    value: function () {
      var _getMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(conversationId, person) {
        var subject, messages;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.subjectRepository.findOne({
                  where: {
                    conversationId: conversationId,
                    person: person
                  }
                });

              case 2:
                subject = _context2.sent;

                if (subject) {
                  _context2.next = 5;
                  break;
                }

                throw {
                  status: 404,
                  body: 'invalid conversation id'
                };

              case 5:
                _context2.next = 7;
                return this.messageRepository.find({
                  where: {
                    conversationId: conversationId,
                    receiverId: person.id
                  }
                });

              case 7:
                messages = _context2.sent;

                if (!(messages.length > 0)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 11;
                return this.messageRepository.delete(messages);

              case 11:
                _context2.next = 13;
                return this.subjectRepository.save(_objectSpread({}, subject, {
                  messageCount: 0
                }));

              case 13:
                return _context2.abrupt("return", messages);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMessages(_x5, _x6) {
        return _getMessages.apply(this, arguments);
      }

      return getMessages;
    }()
  }]);

  return MessageService;
}();

var _default = new MessageService();

exports.default = _default;
//# sourceMappingURL=message.service.js.map