const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // передаем в формате Bearer и дальше идет название token 'jbuuh3u9u9h3ihgjkb08hui'
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

      const data = tokenService.validateAccess(token)
      
    console.log('Decoded', data)
    if (!data) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = data

    next()
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
