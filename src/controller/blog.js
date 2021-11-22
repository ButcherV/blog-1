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

module.exports = {
    getList
}