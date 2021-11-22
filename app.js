const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
    // Return JSON format
    res.setHeader('Content-type', 'application/json')

    // path
    const url = req.url
    req.path = url.split('?')[0]

    // query
    req.query = querystring.parse(url.split('?')[1])

    // blog router
    const blogData = handleBlogRouter(req, res);
    if(blogData) {
        res.end(JSON.stringify(blogData))
        return
    }

    // user router 
    const userData = handleUserRouter(req, res);
    if(userData) {
        res.end(JSON.stringify(userData))
        return
    }

    // 404, Missed route
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Fount\n")
    res.end()
}

module.exports = serverHandle

// env: process.env.NODE_ENV