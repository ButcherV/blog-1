// controller: Specialized data processing

const { exec } = require("../db/mysql")

const getList = (author, keyword) => {
    // // return mock data
    // return [
    //     {
    //         id: 1,
    //         title: '标题A',
    //         content: '内容A',
    //         createTime: 1637549625344,
    //         author: 'zhangsan'
    //     },
    //     {
    //         id: 2,
    //         title: '标题B',
    //         content: '内容B',
    //         createTime: 1637549628377,
    //         author: 'lisi'
    //     }
    // ]
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`

    return exec(sql)
}

const getDetail = (id) => {
    // return mock data
    // return {
    //     id: 1,
    //     title: '标题A',
    //     content: '内容A',
    //     createTime: 1637549625344,
    //     author: 'zhangsan'
    // }
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
} 

const newBlog = (blogData = {}) => {
    // blogData is new blog object, include title , content, author
    // console.log('newBlog blogData...', blogData)

    // return  {
    //     id: 3
    // }

    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', '${createTime}', '${author}')
    `
    
    return exec(sql).then(insertData => {
        console.log('insertData is', insertData)
        return {
            id: insertData.insertId
        }
    })
} 

const updateBlog = (id, blogData = {}) => {
    // blogData is new blog object, include title and content
    // id: new blog id
    // console.log('update blog', id,  blogData)
    
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    return exec(sql).then(updateData => {
        console.log('updateData is ', updateData)
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
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