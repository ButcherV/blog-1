var express = require('express');
var router = express.Router();
const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// api: get /api/blog/list
router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    // const isadmin = req.query.isadmin || ''
    // if(isadmin) {
    //     const loginCheckResult = loginCheck(req)
    //     if(loginCheckResult) {
    //         return loginCheckResult
    //     } 
    //     author = req.session.username 
    // }

    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});

// api: get /api/blog/detail
router.get('/detail', function(req, res, next) {
    res.json({
        errno: 0,
        data: 'ok'
    })
});
  

module.exports = router;
