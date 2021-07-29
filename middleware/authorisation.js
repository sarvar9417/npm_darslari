function authorisation(req, res, next) {
    console.log('Avtorizatsiya middleware ishga tushdi ...')
    next()
}

module.exports = authorisation