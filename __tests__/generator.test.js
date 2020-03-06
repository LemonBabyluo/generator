import { select, sagaRunnerCreator } from '../src/generator'

test('should create "select" effect object', () => {
  function selector() {
  }

  expect(select(selector, 'name')).toEqual({
    type: 'SELECT',
    fn: selector,
    args: ['name']
  })
})

test('should create "sagaRunnerCreator" to run generator function', (done) => {
  function getState() {
    return { userInfo: { id: '123', name: 'Deep' } }
  }

  const getUserInfo = (state) => state.userInfo
  const getUserProperty = (state, key) => state.userInfo[key]

  // expect.assertions(2);
  function* someSaga() {
    try {
      const userInfo = yield select(getUserInfo)
      expect(userInfo).toEqual({
        id: '123',
        name: 'Deep'
      })
      const userProperty = yield select(getUserProperty, 'name')
      expect(userProperty).toBe('Deep')
      done()
    } catch (error) {
      done(error)
    }
  }

  const sagaRunner = sagaRunnerCreator({ getState })
  sagaRunner.run(someSaga)
})
