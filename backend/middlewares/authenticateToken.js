const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
       statusCode: 401,
       success: false,
       messages: 'No token provided'
      });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        statusCode: 403,
        success: false,
        messages: 'Failed to authenticate token' 
      });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
