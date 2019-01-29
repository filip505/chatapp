import { server } from './../../../main'
import getContext from './../../testContext'
import axios from 'axios'
import { isRegExp } from 'util';

describe('sign in user', () => {
  let context

  beforeAll(async () => {
    context = await getContext(true) 
  })

  it('sing in user 200', async (done) => {
    const request = { email: 'test@test.com', password: 'test' }
    axios.post('http://localhost:5001/signin', request).then((response) => {
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
    done()
  })

})