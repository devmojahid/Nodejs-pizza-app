const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customars/cartController");
const homeController = require("../app/http/controllers/homeController");

function initRouts(app){
    app.get('/', homeController().index)
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    app.get('/login',authController().login )
    app.get('/register',authController().register)
}

module.exports = initRouts;