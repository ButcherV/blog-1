const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    const resData = {
        name: 'xiaowei',
        site: 'blog'
    }

    res.end(
        JSON.stringify(resData)
    )
}

module.exports = serverHandle