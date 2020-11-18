const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    //jwt verification
    if(token) {
        jwt.verify(token, 'new user at my website', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else {
        res.redirect('/login'); 
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'new user at my website', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                console.log('Middleware dude!');
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }


}

module.exports = {
    requireAuth,
    checkUser,
}