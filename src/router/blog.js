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
        const listData = getList(author, keyword)

        return new SucessModel(listData)
    }

    //Get blog detail
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SucessModel(data)
    }

    //Create a new blog
    if(method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SucessModel(data)
    }

    //Update a blog
    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if(result) {
            return new SucessModel()
        } else {
            return new ErrorModel('update blog failure')
        }
    }

    //Delete a blog
    if(method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if(result) {
            return new SucessModel()
        } else {
            return new ErrorModel('delete blog failure')
        }        
    }
}

module.exports = handleBlogRouter;