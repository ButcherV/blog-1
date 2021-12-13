var express = require('express');
const { SuccessModel, ErrorModel } = require('../model/resModel')
var router = express.Router();
const { login } = require('../controller/user')

// api: post /api/user/login
router.post('/login', function(req, res, next) {
    console.log('req.session is ', req.session)
    const {username, password} = req.body
    const result = login(username, password)
    return result.then(data => {
        if(data.username) {
            // session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(new SuccessModel())
            return
        }
        res.json(new ErrorModel('login fail'))  
    })
});

router.get('/login-test', (req, res, next) => {
    console.log('req.session is ', req.session)
    if (req.session.username) {
        res.json({
            errno: 0,
            msg: '已登录'
        })
        return
    }
    res.json({
        errno: -1,
        msg: '未登录'
    })
})

// router.get('/session-test', (req, res, next) => {
//     console.log("req.session", req.session)
//     if(session.viewNum == null) { 
//         session.viewNum = 0
//     }
//     session.viewNum++

//     res.json({
//         viewNum: session.viewNum
//     })
// })

router.get('/login-test', (req, res, next) => {
    if(req.ression.username) {
        res.json({
            errno: 0,
            msg: '已登录'
        })
        return
    }
    res.json({
        errno: -1,
        msg: '未登录'
    })
})

router.get('/session-test', (req, res, next) => {
    console.log("req.session", req.session)
    // const session = req.session
    // if (session.viewNum == null) {
    //     session.viewNum = 0
    // }
    // session.viewNum++

    res.json({
        viewNum: req.session
    })
})
  
module.exports = router;
