function logger(req, res, next) {
    console.log('Logger middleweare ishga tushdi...')
    next()
}

module.exports = logger