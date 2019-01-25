const uuid = require('uuid/v1')

module.exports = function (connection) {
  return {
    init: async function () {
      await this.createUser()
    },
    createUser: async function (
      firstName = 'test',
      lastName = 'test',
      name = 'test',
      pass = 'test'
    ) {
      await connection.getRepository('person').save({
        id: uuid(),
        firstName,
        lastName,
        name,
        pass
      })
    }
  }

}