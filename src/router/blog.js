const { getList, getDetail } = require('../controller/blog')
const { SucessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST

    //Get blog list
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)

        return new SucessModel(listData)
    }

    //Get blog detail
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        const data = getDetail(id)
        return new SucessModel(data)
    }

    //Create a new blog
    if(method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: 'Interface to create a new blog'
        }
    }

    //Update a blog
    if(method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: 'Interface to update a blog'
        }
    }

    //Delete a blog
    if(method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: 'Interface to delete a blog'
        }
    }
}

module.exports = handleBlogRouter;