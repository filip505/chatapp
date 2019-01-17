const axios = require('axios')
describe('sign in user', () => {
  let close

  beforeAll((done) => {
    require('../../../server').then(clean => {
      close = clean
      done();
    })
  })

  it('sing in user success', async (done) => {
    const request = { email: 'test@test.com', password: 'test' }
    axios.get('http://localhost:5001/singin', request).catch(({response}) => {
      expect(response.status).toEqual(404)
      done()
    })
  })

  afterAll(() => {
    close()
  })
})