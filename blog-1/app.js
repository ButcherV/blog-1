const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// const SESSION_DATA = {}

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 *60 * 60 *1000))
    return d.toGMTString()
}

// Processing post data
// Q
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
    // Record access logs
    access(`${req.method} -- ${req.url}-- ${req.headers['user-agent']} -- ${Date.now()}`)

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
    if(cookieStr) {
        cookieStr.split(';').forEach(item => {
            const arr = item.split('=')
            // trim(): need to remove the space in front of the value after the first value in the cookie.
            // https://coding.imooc.com/lesson/320.html#mid=22621
            const key = arr[0].trim()
            const val = arr[1].trim()
            req.cookie[key] = val
        })
        // console.log('req.cookie is ', req.cookie)
    }

    // session
    // let needSetCookie = false
    // let userId = req.cookie.userid || ''

    // if(userId) {
    //     // Q
    //     // https://coding.imooc.com/learn/questiondetail/G8glLYlpV0wYxpDa.html
    //     if(!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]
     
    // session in redis
    let needSetCookie = false
    let userId = req.cookie.userid || ''

    if(!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`

        // init session in redis
        set(userId, {})
    }

    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if(sessionData == null) {
            // init session in redis
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        console.log('req.session ', req.session)

        return getPostData(req)
    }).then(postData => {
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
                if(needSetCookie) {
                    //Q
                    //https://coding.imooc.com/learn/questiondetail/r9mGBP5qjk1PjaKR.html
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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