const User = require('../models/User')

// 自执行的异步函数
!(async () => {
    //创建用户
    // const zhangsan = await User.create({
    //     username: 'zhangsan',
    //     password: '123',
    //     realname: '张三'
    // })
    // console.log(zhangsan)

    //查询
    // const list = await User.find()
    // console.log(list)

    //模拟登录，是否有匹配到
    const zhangsan = await User.find({
        username: 'zhangsan',
        password: '123'
    })
    console.log(zhangsan)
})()