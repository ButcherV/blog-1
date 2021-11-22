const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST

    //Get blog list
    if(method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg: 'Interface to get blog list'
        }
    }

    //Get blog detail
    if(method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: 'Interface to get blog detail'
        }
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