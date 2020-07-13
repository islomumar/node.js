function log(req, res, next) {
    console.log('log yozish')
    next()
}
function auth(req, res, next) {
    console.log('Autentifikatsiya qilish...')
    next()
}
module.exports.log = log
module.exports.auth = auth