const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const { requireAuth } = require('./middleware/auth');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const mainRoute = require('./routes/mainRoute');
const jokesRoute = require('./routes/jokesRoute');
const createJokeRoute = require('./routes/createJokeRoute');
const trendingRoute = require('./routes/trendingRoute');
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signUpRoute');
const logoutRoute = require('./routes/logoutRoute');


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000
});

app.use(limiter);
app.use(hpp());
app.use(cors());


app.set('view engine', 'ejs');

app.use('/', mainRoute);
app.use('/jokes', jokesRoute);
app.use('/makejoke', requireAuth, createJokeRoute);
app.use('/trending', trendingRoute);
app.use('/auth/login', loginRoute);
app.use('/auth/signup', signupRoute);
app.use('/auth/logout', logoutRoute);

app.use((req, res) => {
    res.status(404).render('errorpage');
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`server running on ${PORT}`));