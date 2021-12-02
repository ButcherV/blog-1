const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

// 创建 read stream
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

// 逐行读取
rl.on('line', (lineData) => {
    // 排除异常情况
    if(!lineData) {
        return
    }

    // 记录总行数
    sum++

    // data format: GET -- /api/blog/list-- Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 -- 1638406777041
    const arr = lineData.split(' -- ')
    if(arr[2] && arr[2].indexOf('Chrome') > 0) {
        // 累加 chrome 的数量
        chromeNum++
    }
})

// 监听读取完成
rl.on('close', () => {
    console.log(chromeNum, sum)
    console.log('chrome 占比：' + chromeNum / sum)
})