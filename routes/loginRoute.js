const express = require('express');
const User = require('../models/UserModel');

const loginRoute = express.Router();

loginRoute.get('/', (req, res) => {
    res.render('login');
});

loginRoute.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('errorPage');
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.render('errorPage');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.render('errorPage');
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.render('errorpage');
    }
});

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
        .cookie('token', token, options)
        .redirect('/');
}

module.exports = loginRoute;