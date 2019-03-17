describe('ping', () => {

  it('ping', () => {
    expect(5).toEqual(5)
  })

})

//   it('login user invalid request', async (done) => {
//     const request = { email: 'test@test.com' }
//     axios.post('http://localhost:5001/login', request).catch(({ response }) => {
//       expect(response.status).toEqual(404)
//       done()
//     })
//   })