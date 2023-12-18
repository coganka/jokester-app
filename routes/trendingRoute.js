const express = require('express');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const Jokes = require('../models/JokeModel');

const trendingRoute = express.Router();

trendingRoute.get('/', async (req, res) => {
    try {
        let count = 0;
        const jokes = await Jokes.find({
            createdAt: {
                $gte: startOfDay(new Date()),
                $lte: endOfDay(new Date())
            }
        }).sort('-likes');
        res.render('trending', {
            jokes,
            count
        });
    } catch (err) {
        res.render('errorpage');
    }
});

module.exports = trendingRoute;