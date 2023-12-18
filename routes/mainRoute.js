const express = require('express');
const Joke = require('../models/JokeModel');

const mainRoute = express.Router();

mainRoute.get('/', async (req, res) => {
    try {
        const jokes = await Joke.find({});
        const randId = Math.floor(Math.random() * jokes.length);
        res.render('mainpage', {
            jokes,
            randId
        });
    } catch (err) {
        res.render('errorpage');
    }
});

module.exports = mainRoute;