const fs = require('fs')
const path = require('path') // path 模块用来处理不同操作系统各异的路径格式。

// __dirname: 返回当前模块文件解析过后所在的文件夹(目录)的绝对路径。
// 返回当前路径下的 data.txt 这个文件的绝对路径。
const fileName = path.resolve(__dirname, 'data.txt')

console.log(fileName)

// // 读取文件内容
// fs.readFile(fileName, (err, data) => {
//     if(err) {
//         console.error(err)
//         return
//     }

//     // data 是二进制类型，需要转换为字符串。
//     console.log(data.toString())
// })

// 写入文件内容
const content = '这是新写入的内容\n'
const opt = {
    flag: 'a' // 追加写入。覆盖用 ‘w’
}
fs.writeFile(fileName, content, opt, (err) => {
    // 写入只有一个 err 参数。没有 data 参数，因为无需返回什么。
    if(err) {
        console.err(err)
    }
})

// 判断文件是否存在
fs.access(fileName, (err) => {
    console.log(err ? 'does not exist' : 'exists');
});

// // 网络层的 stream 应用
// const http = require('http')
// const server = http.createServer((req, res) => {
//     if(req.method === 'POST') {
//         const result = ''
//         req.on('data', (chunk) => {
//             // 接收到部分数据
//             const str = chunk.toString()
//             result += str
//         });
//         req.on('end', () => {
//             // 接收数据完成
//             // 返回结果
//             res.end('OK');
//         })
//     }
// })
