const express = require('express')
const app = express()
const PORT = process.env.POST || 3000
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

//*** Tamplate Engine Set */






//app.use(expressLayouts);
app.set('views',path.join( __dirname,"./resources/views" ));
app.set('view engine' , 'ejs');

app.get('/', (req, res) => {
    res.render('main');
})
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))