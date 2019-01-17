const uuid = require('uuid/v1')

module.exports = {
  init(connection) {
    if(connection){
      console.log('ima')
    }
    else{ 
      console.log('nema')
    }
    this.createUser(connection)
  },

  async createUser(connection){
    const person = connection.getRepository('person')
    await person.save({
      id: uuid(),
      firstName: 'test',
      lastName: 'test',
      name: 'test',
      pass: 'test'
    })
  }
}