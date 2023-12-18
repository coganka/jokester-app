const express = require('express');
const logoutRoute = express.Router();

logoutRoute.get('/', (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.redirect('/auth/login');
});

module.exports = logoutRoute;