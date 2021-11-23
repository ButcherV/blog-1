const getList = (author, keyword) => {
    // return mock data
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1637549625344,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1637549628377,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    // return mock data
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1637549625344,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    // blogData is new blog object, include title and content
    // console.log('newBlog blogData...', blogData)

    return {
        id: 3 // new blog id in database
    }
} 

const updateBlog = (id, blogData = {}) => {
    // blogData is new blog object, include title and content
    // id: new blog id
    // console.log('update blog', id,  blogData)

    return true
}

const delBlog = (id) => {
    return true
}

 

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}