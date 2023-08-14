const user = require('../controller/usersController');

module.exports = (app, upload) =>{
    app.post('/api-tsoftware/users/create',  user.register);
    app.post('/api-tsoftware/users/createWithImage', upload.array('image',1), user.registerWithImage);
    app.post('/api-tsoftware/users/login', user.login);

    app.put('/api-tsoftware/users/update', upload.array('image', 1), user.update);
    app.put('/api-tsoftware/users/updateWithoutImage', user.updateWithoutImage);
}