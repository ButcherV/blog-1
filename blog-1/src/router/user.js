const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // Login
    if(method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        const result = login(username, password)
        return result.then(data => {
            if(data.username) {
                // session
                req.session.username = data.username
                req.session.realname = data.realname

                // session in redis
                set(req.sessionId, req.session)

                console.log('req.session is ', req.session)

                return new SuccessModel()
            }
            return new ErrorModel('login fail')
        })
        
    }

    // Login test check
    // if(method === 'GET' && req.path === '/api/user/login-test') {
    //     console.log('login-test', req.session)
    //     if(req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             })
    //         )
    //     }
    //     return Promise.resolve(new ErrorModel('no login'))
    // }
}

module.exports = handleUserRouter;