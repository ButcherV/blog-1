const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    //Login
    if(method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: 'Interface to login'
        }
    }
}

module.exports = handleUserRouter;