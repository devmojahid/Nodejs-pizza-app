require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.POST || 3000
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo');

// let mongostore = new MongoDbStore({
//     mongooseConnection:connection,
//     collection:"sessions"
// })

//Session
app.use(session({
    secret:process.env.COOKEY_SECRET,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/pizza",
        collectionName: 'sessions' // See below for details
      }),
    cookie:{maxAge:1000*60*60*24} // 24 hours
    // cookie:{maxAge:1000*5} // 24 hours
}))

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
})

app.use(flash());

app.use(express.json())
// Database connection
const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL || "mongodb://localhost/pizza";
mongoose.connect(MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log('cunnection Successfull')})
.catch(err=>{console.log(err)})
const connection = mongoose.connection;


//*** Tamplate Engine Set */

app.use(expressLayouts);
app.set('views',path.join( __dirname,"./resources/views" ));
app.set('view engine' , 'ejs');

require('./routes/web')(app)
app.use(express.static('public'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))