const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'myblog'

MongoClient.connect(
    url,
    { }, // config 
    (err, client) => {
        if(err) {
            console.error('mongodb connect error', err)
            return
        }

        // 没有报错，说明连接成功
        console.log('mongodb connect success')

        // 切换到数据库（控制台 `use myblog`)
        const db = client.db(dbName)

        // 关闭连接
        client.close()
    }
)
