module.exports = {
  secretKey : require('crypto').randomBytes(256).toString('base64')
}
