const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 *60 * 60 *1000))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // Login
    if(method === 'GET' && req.path === '/api/user/login') {
        // const {username, password} = req.body
        const {username, password} = req.query
        const result = login(username, password)
        return result.then(data => {
            if(data.username) {
                // cookie
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

                return new SuccessModel()
            }
            return new ErrorModel('login fail')
        })
        
    }

    // Login test check
    if(method === 'GET' && req.path === '/api/user/login-test') {
        if(req.cookie.username) {
            return Promise.resolve(new SuccessModel({username: req.cookie.username}))
        }
        return Promise.resolve(new ErrorModel('no loggin'))
    }
}

module.exports = handleUserRouter;