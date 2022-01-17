// 对应 user 集合

const mongoose = require('../db')

// 用 Schema 定义数据规范
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    realname: String
})

// Model 对应 collection
const User = mongoose.model('user', UserSchema)

module.exports = User