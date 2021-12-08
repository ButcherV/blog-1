// crypto 为 nodejs 自带的模块
const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'WJiol_8776#'

// 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    // 加密后并以 16 进制的形式输出
    return md5.update(content).digest('hex')
}


// 加密函数
function genPassword(password) {
    // 不仅是 SECRET_KEY，整个 str 其实也起到了密钥的效果。
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

// const result = genPassword('123')
// console.log(result)
module.exports = {
    genPassword
}