const User = require('../model/user');

module.exports = {
    register(req, res) {
        const user = req.body; //Captura los datos del cliente
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con el registro del usuario'
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Registro exitoso',
                data: data //Retorna el id del registro
            });
        });
    }
}