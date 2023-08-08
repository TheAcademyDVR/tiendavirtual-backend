const user = require('../controller/user');

module.exports = (app) =>{
    app.post('/api-tsoftware/users/create', user.register);
    app.post('/api-tsoftware/users/login', user.login);
}