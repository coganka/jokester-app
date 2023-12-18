const express = require('express');
const Joke = require('../models/JokeModel');

const createJokeRoute = express.Router();

createJokeRoute.get('/', (req, res) => {
    res.render('makejoke');
});

createJokeRoute.post('/', async (req, res) => {
    try {
        const { title, body } = req.body;
        const likes = 0;
        const author = req.user.username;

        const joke = new Joke({
            title,
            body,
            author,
            likes
        });
        
        await joke.save();
        res.redirect('/jokes/all-jokes');
    } catch (err) {
        res.render('errorpage');
    }
});

module.exports = createJokeRoute;