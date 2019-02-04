import { server } from './../main'

class TestContext {
  async init() {
    const { app, connection, fixtures } = await server
    this.app = app
    this.connection = connection
    this.fixtures = fixtures
  }
}

let context

let count = 0

const getContext = async (reuse) => {
  console.log('tu sam opet', context)
  if (context == undefined) {
    console.log('tu sam opet', count)
    count++
    context = new TestContext()
    await context.init()
  
  }
 
  return context

}

export default getContext