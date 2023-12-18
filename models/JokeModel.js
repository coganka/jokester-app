const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jokeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        min: 0,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Joke = mongoose.model('Joke', jokeSchema);
module.exports = Joke;