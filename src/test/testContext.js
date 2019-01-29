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

const getContext = async (reuse) => {
  if (reuse && context == undefined) {
    context = new TestContext()
    await context.init()
    return context
  }
  else if (reuse) {
    return context
  }
  else {
    context = new TestContext()
    context.app.close()
    context.connection.close()
    await context.init()
    return context
  }

}

export default getContext