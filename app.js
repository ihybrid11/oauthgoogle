const express = require('express');
const authRoute = require('./routes/auth.routes');
const app = express();


//setup view engine
app.set('view engine', 'ejs');
app.use('/auth', authRoute);


//home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log(`listening on port 3000`);

});