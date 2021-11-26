const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// Processing post data
// Mark - dont understand
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
} 

const serverHandle = (req, res) => {
    // Return JSON format
    res.setHeader('Content-type', 'application/json')

    // path
    const url = req.url
    req.path = url.split('?')[0]

    // query
    req.query = querystring.parse(url.split('?')[1])

    // cookie
    const cookieStr = req.headers.cookie || '' 
    req.cookie = {}
    
    // k1=v1;k2=v2;k3=v3; => {k1: 'v1', k2: 'v2', k3: 'v3'}
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return
        }
        const arr = item.split('=')
        // trim(): need to remove the space in front of the value after the first value in the cookie.
        // https://coding.imooc.com/lesson/320.html#mid=22621
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })
    // console.log('req.cookie is ', req.cookie)

    getPostData(req).then(postData => {
        req.body = postData

        // blog router
        // const blogData = handleBlogRouter(req, res);
        // if(blogData) {
        //     res.end(JSON.stringify(blogData))
        //     return
        // }
        const blogResult = handleBlogRouter(req, res);
        if(blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }


        // user router 
        // const userData = handleUserRouter(req, res);
        // if(userData) {
        //     res.end(JSON.stringify(userData))
        //     return
        // }
        const userResult = handleUserRouter(req, res);
        if(userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 404, Missed route
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Fount\n")
        res.end()
    })
}

module.exports = serverHandle

// env: process.env.NODE_ENV