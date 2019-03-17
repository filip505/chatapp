"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConversationService =
/*#__PURE__*/
function () {
  function ConversationService() {
    _classCallCheck(this, ConversationService);

    _defineProperty(this, "conversationRepository", (0, _typeorm.getRepository)('conversation'));

    _defineProperty(this, "messageRepository", (0, _typeorm.getRepository)('message'));

    _defineProperty(this, "personRepository", (0, _typeorm.getRepository)('person'));

    _defineProperty(this, "subjectRepository", (0, _typeorm.getRepository)('subject'));
  }

  _createClass(ConversationService, [{
    key: "getOrCreateConversation",
    value: function () {
      var _getOrCreateConversation = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(number, user) {
        var companion, subject, conversation;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.personRepository.findOne({
                  number: number
                });

              case 2:
                companion = _context.sent;

                if (companion) {
                  _context.next = 5;
                  break;
                }

                throw {
                  status: 404,
                  body: 'companion not found'
                };

              case 5:
                _context.next = 7;
                return this.subjectRepository.findOne({
                  where: {
                    companion: companion,
                    person: user
                  },
                  relations: ['conversation'],
                  limit: 1
                });

              case 7:
                subject = _context.sent;

                if (!subject) {
                  _context.next = 13;
                  break;
                }

                console.log('getting conversation', subject.conversation);
                conversation = subject.conversation;
                _context.next = 17;
                break;

              case 13:
                console.log('creating conversation');
                _context.next = 16;
                return this.conversationRepository.save({
                  updatedAt: new Date().toLocaleString(),
                  subjects: [{
                    companion: companion,
                    person: user
                  }, {
                    person: companion,
                    companion: user
                  }]
                });

              case 16:
                conversation = _context.sent;

              case 17:
                conversation.companionId = companion.id;
                conversation.companion = companion;
                return _context.abrupt("return", conversation);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOrCreateConversation(_x, _x2) {
        return _getOrCreateConversation.apply(this, arguments);
      }

      return getOrCreateConversation;
    }()
  }, {
    key: "getConversations",
    value: function () {
      var _getConversations = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(user) {
        var subjects, conversations;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.subjectRepository.find({
                  where: {
                    person: user
                  },
                  relations: ['companion', 'conversation']
                });

              case 2:
                subjects = _context2.sent;
                conversations = subjects.map(function (subject) {
                  var response = subject.conversation;
                  response.companion = subject.companion;
                  response.companionId = subject.companion.id;
                  response.messageCount = subject.messageCount;
                  return response;
                }).filter(function (conversation) {
                  return conversation.lastMessageId;
                });
                return _context2.abrupt("return", conversations);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getConversations(_x3) {
        return _getConversations.apply(this, arguments);
      }

      return getConversations;
    }()
  }]);

  return ConversationService;
}();

var _default = new ConversationService();

exports.default = _default;
//# sourceMappingURL=conversation.service.js.map