const express = require('express');
const User = require('../models/UserModel');

const signupRoute = express.Router();

signupRoute.get('/', (req, res) => {
    res.render('signup');
});

signupRoute.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        
        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.render('errorpage');
    }
});

// CHANGE THIS !!
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .redirect('/');
}


module.exports = signupRoute;