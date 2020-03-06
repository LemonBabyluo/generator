// 就当这个是 redux 的 getState 函数。
function getState() {
    return {userInfo: {id: '123', name: 'Deep'}}
}

// 这个怎么写？注意看下面的入口中的执行方式。
function sagaRunnerCreator({getState}) {
    // ...
    const run = function (fn) {
        const g = fn()
        let res = g.next()

        while (!res.done) {
            const {type, fn, args} = res.value
            let result = res.value

            if (type && type === 'SELECT') {
                result = fn.apply(fn, [getState(), ...args])
            }
            res = g.next(result)
        }
    }
    return { run }
}

// 这个怎么写？
// const select = undefined;
const select = function (fn, ...args) {
    return {
        type: 'SELECT',
        fn,
        args
    }

}

// 选择器，获得用户信息。
const getUserInfo = (state) => state.userInfo
const getUserProperty = (state, key) => state.userInfo[key]

// 业务 Saga，完成一个获得用户信息的简单任务。
function* someSaga() {
    const userInfo = yield select(getUserInfo)
    console.log('用户信息是：', userInfo)
    const userProperty = yield select(getUserProperty, 'name')
    console.log('用户名称：', userProperty)
}

// 执行入口函数
function main() {
    // 获得 saga 执行器。
    const sagaRunner = sagaRunnerCreator({getState})

    // 执行业git reset HEAD务 saga。
    sagaRunner.run(someSaga)
}

export {
  select,
  sagaRunnerCreator,
  someSaga
}

