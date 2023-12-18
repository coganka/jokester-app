const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/auth/login');
            } else {
                req.user = await User.findById(decodedToken.id);
                next();
            }
        });
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = { requireAuth };

/*const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id);
next();*/