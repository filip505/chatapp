const axios = require('axios')

describe('sign in user', () => {
  let app, connection, fixtures

  beforeAll((done) => {
    require('index').then(clean => {
      app = clean.app
      connection = clean.connection
      fixtures = clean.fixtures
      done();
    })
  })

  it('sing in user 200', async (done) => {
    const request = { email: 'test@test.com', password: 'test' }
    axios.post('http://localhost:5001/signin', request).then((response) => {
      //const body = JSON.parse('response.body')
      console.log('typeof', response.data.email)
      expect(response.status).toEqual(201)
      expect(response.data.email).toEqual(request.email)
      expect(response.data.password).toEqual(request.password)
      done()
    })
  })

  it('sing in user 404', async (done) => {
    const request = { email: 'test@test.com' }
    axios.post('http://localhost:5001/signin', request).catch(({ response }) => {
      expect(response.data.message).toEqual('Missing required property: password')
      done()
    })
  })

  afterAll(() => {
    connection.close()
    app.close()
  })
})