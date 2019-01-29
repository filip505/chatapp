import getContext from './testContext'
beforeAll(() => console.log('beforeAll'));
afterAll(async () => {
  const context = await getContext(true)
  context.app.close();
  context.connection.close()
});