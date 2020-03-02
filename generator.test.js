import { select, sagaRunnerCreator, someSaga } from './generator'

test('should create "select" effect object', () => {
    function selector() {
    }

    expect(select(selector, 'name')).toEqual({
        type: 'SELECT',
        fn: selector,
        args: ['name']
    })
})
