const axios = require('axios')
let close

beforeAll((done) => {
  require('./../server').then(clean => {
    close = clean
    done();
  })
})

it('server started', () => {
  axios.get('http://localhost/ping').then(res => expect(res.status).toEqual(200))
})

afterAll(() => {
  console.log(close)
  close()
})
