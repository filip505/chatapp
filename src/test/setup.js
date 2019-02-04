import getContext from './testContext'
beforeAll(() => console.log('beforeAll'));
afterAll(async () => {
  const context = await getContext(true)
  await context.app.close();
  await context.connection.close()
  console.log('ZATVORENO', context.app.close)
});