var HttpStatus = require('http-status-codes');

module.exports = function (req, res, next) {
  const token = req.headers.token
  if (token) {
    if (token === '123') {
      req.user = { name: 'Filip', auth: 'Admin' }
    }
  }
  next();
}