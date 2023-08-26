const passport = require('passport');
const category = require('../controller/categoriesController');

module.exports = (app, upload) =>{
    // GET
    app.get('/api-tsoftware/categories/getAll', passport.authenticate('jwt', {session: false}), category.getAll);
    // POST
    app.post('/api-tsoftware/categories/create', passport.authenticate('jwt', {session: false}), upload.array('image', 1), category.create);
    // PUT
    app.put('/api-tsoftware/categories/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 1), category.updateWithImage);
    app.put('/api-tsoftware/categories/update', passport.authenticate('jwt', {session: false}), category.update);
    // DELETE
    app.delete('/api-tsoftware/categories/delete/:id', passport.authenticate('jwt', {session: false}), category.delete);

}