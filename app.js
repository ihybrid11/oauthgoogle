const express = require('express');
const authRoute = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const passportSetup = require('./config/passport.setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();


//setup view engine
app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/profile', profileRoutes);

mongoose.connect(keys.mongo.url, () => {
    console.log('connected to db');

});

//home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log(`listening on port 3000`);

});