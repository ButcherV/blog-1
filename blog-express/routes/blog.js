var express = require('express');
var router = express.Router();

// api: get /api/blog/list
router.get('/list', function(req, res, next) {
    res.json({
        errno: 0,
        data: [1, 2, 3]
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
