const express = require('express');
const Joke = require('../models/JokeModel');

const jokesRoute = express.Router();


jokesRoute.get('/all-jokes', async (req, res) => {
    const size = 10;
    const page = req.query.page || 1;
    
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const numPage = Number(page);

    try {
        const allJokes = await Joke.find({}).limit(limit).skip(skip);
        res.render('alljokes', {
            allJokes,
            numPage
        });
    } catch (err) {
        res.render('errorpage');
    }
});

jokesRoute.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const joke = await Joke.findById(id);
        res.render('singlejoke', {
            joke
        });
    } catch (err) {
        res.render('errorpage');
    }
});

jokesRoute.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const joke = await Joke.findById(id);
        await Joke.findByIdAndUpdate(id, {
            likes: joke.likes + 1
        });
        res.redirect(`/jokes/${id}`);
    } catch (err) {
        res.render('errorpage');
    }
});


module.exports = jokesRoute;