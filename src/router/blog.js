const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SucessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    const id = req.query.id

    //Get blog list
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SucessModel(listData)
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SucessModel(listData)
        })
    }

    //Get blog detail
    if(method === 'GET' && req.path === '/api/blog/detail') {
        // const data = getDetail(id)
        // return new SucessModel(data)
        const result = getDetail(id)
        return result.then(data => {
            return new SucessModel(data)
        })
    }

    //Create a new blog
    if(method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body)
        // return new SucessModel(data)
        req.body.author = 'zhangsan' // New blogs are created after logging in. Login is not implemented here, and the author temporarily uses false data.
        const result = newBlog(req.body)
        return result.then(data => {
            return new SucessModel(data)
        })
    }

    //Update a blog
    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val) {
                return new SucessModel()
            } else {
                return new ErrorModel('update blog failure')
            }
        })

    }

    //Delete a blog
    if(method === 'POST' && req.path === '/api/blog/del') {
        const author = 'zhangsan' // New blogs are created after logging in. Login is not implemented here, and the author temporarily uses false data.
        const result = delBlog(id, author)
        return result.then(val => {
            if(val) {
                return new SucessModel()
            } else {
                return new ErrorModel('delete blog failure')
            }
        })
    }
}

module.exports = handleBlogRouter;