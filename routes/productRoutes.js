const passport = require('passport');
const product = require('../controller/productsController');

module.exports = (app, upload) =>{
    // GET
    app.get('/api-tsoftware/products/findByCategory/:id_category', passport.authenticate('jwt', {session: false}), product.findByCategory);
    // POST
    app.post('/api-tsoftware/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), product.create);
    // PUT
    app.put('/api-tsoftware/products/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 3), product.updateWithImage);
    app.put('/api-tsoftware/products/update', passport.authenticate('jwt', {session: false}), product.update);
    // DELETE
    app.delete('/api-tsoftware/products/delete/:id', passport.authenticate('jwt', {session: false}), product.delete);

}