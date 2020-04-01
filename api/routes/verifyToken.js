const jwt = require('jsonwebtoken');

// check whether the user has the unique token to access private routes
module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) res.status(401).send('Access denied!'); // 401 access denied; got no token

    // Verify the token
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next(); 
    } catch(err) {
        res.status(400).send('Invalid Token')
    }
}