const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
              if(err) res.status(403).json('Token is not valid!');
              req.user = user;
              next();
       });
    }else{
        return res.status(401).json("You are not authenticated!");
    }    
};

const verifyTokenAndAuthorization = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if(req.user.id === req.params.id || req.user.isAdmin){
                next();
            }else{
                res.status(403).json('You are not allowed to do that!');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// Admin Authorization
const verifyTokenAndAdmin = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if(req.user.isAdmin){
                next();
            }else{
                res.status(403).json('You are not allowed to do that!');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};