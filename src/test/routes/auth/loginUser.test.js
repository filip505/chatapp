import { server } from './../../../main'
import Fixtures from './../../../main/fixtures'
import axios from 'axios'

describe('login user', () => {

  let app, fixtures

  beforeAll(async () => {
    app = await server(5001)
  })

  afterAll(() => {
    app.closeAll()
  })

  it('login user 200', async (done) => {
    fixtures = new Fixtures()
    const user = await fixtures.createUser('test@test.com', 'test')
    const token = await fixtures.createToken(user)
    const request = { email: 'test@test.com', password: 'test' }
    axios.post('http://localhost:5001/login', request, {
      headers: {
        'token': token.id,
      }
    }).then((response) => {
      expect(response.status).toEqual(200)
      expect(response.data.user.password).toEqual('test')
      expect(response.data.user.email).toEqual('test@test.com')
      expect(response.data.token).toBeTruthy()
      done()
    })
  })

  it('login user invalid request', async (done) => {
    const request = { email: 'test@test.com' }
    axios.post('http://localhost:5001/login', request).catch(({ response }) => {
      expect(response.status).toEqual(404)
      done()
    })
  })

  it('login invalid user', async (done) => {
    const request = { email: 'test@test.com', password: 'test2' }
    axios.post('http://localhost:5001/login', request).catch(({ response }) => {
      expect(response.status).toEqual(403)
      done()
    })
  })

})