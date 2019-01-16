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
    console.log('1')
    // await person.save({
    //   id: uuid(),
    //   firstName: 'test',
    //   lastName: 'test',
    //   email: 'test',
    //   password: 'test'
    // })
    console.log('2')
  }
}