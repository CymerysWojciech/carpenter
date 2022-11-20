const jwt = require('jsonwebtoken');

module.exports = function authenticate(req, res, next){
    const authToken = req.cookies.authToken.accessToken;

    if(authToken === null)return res.send.status(401);
    jwt.verify(authToken, process.env.TOKEN_SECRET, (err, user) =>{
        if(err)return res.sendStatus(403);
        req.user = user;
        next();
    })
}