const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');   // mongoose model
require('./models/Purchase');
require('./services/passport');

const app = express();


app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    limit: '500mb'
}));
app.use(session({
    secret: "enjoyable memes",
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(require('./routes'))

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    keepAlive: 1,
    reconnectTries: 30,
    useUnifiedTopology: true
}).then(() => {
    console.log("successfully connected to mongo")
}).catch((err) => {
    console.error("error connecting to mongo");
    console.error(err);
})


const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || 'dev'

if (environment === "dev"){
    console.log("\x1b[31m", "ENVIRONMENT IS DEV - ENSURE THAT THIS IS NOT SHOWING WHEN DEPLOYED", "\x1b[0m");
} else if (environment === "production") {
    console.log("\x1b[34m", "RUNNING IN PRODUCTION", "\x1b[0m");
    app.use(express.static('client/build'));    // make sure express serves production assets
    // make sure express serves index.html if it doesn't know the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT);