const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
    // http://nodejs.cn/api/stream.html#writablewritechunk-encoding-callback
    writeStream.write(log + '\n') // 关键代码
}


// 生成 write stream
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}