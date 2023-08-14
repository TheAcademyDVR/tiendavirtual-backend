const user = require('../controller/users');

module.exports = (app, upload) =>{
    app.post('/api-tsoftware/users/create',  user.register);
    app.post('/api-tsoftware/users/createWithImage', upload.array('image',1), user.registerWithImage);
    app.post('/api-tsoftware/users/login', user.login);
}