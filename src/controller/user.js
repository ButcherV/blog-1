const loginCheck = (username, password) => {
    // mockdata
    if(username === 'zhangsan' && password === '123') {
        return true
    }
    return false
}

module.exports = {
    loginCheck
}