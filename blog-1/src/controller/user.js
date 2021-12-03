const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = escape(username)

    // genPassword 处理要在 escape 之前。
    // escape 做的工作是转义块内的单引号，在整体加上单引号。
    // 如果 escape(password) 写在 genPassword(password) 之前，
    // genPassword(password) 则把单引号也会一块给加密了。
    password = genPassword(password)
    console.log('gen', genPassword(password))
    password = escape(password)

    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
    console.log('sql is', sql)
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}