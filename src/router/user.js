const { loginCheck } = require('../controller/user')
const { SucessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    //Login
    if(method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        const result = loginCheck(username, password)
        return result.then(data => {
            if(data.username) {
                return new SucessModel()
            }
            return new ErrorModel('login fail')
        })
        
    }
}

module.exports = handleUserRouter;