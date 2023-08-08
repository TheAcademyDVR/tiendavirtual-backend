const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con el email del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ //EL CLIENTE NO TIENE AUTORIZACION PARA HACER ESTA PETICION
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWS ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado exitosamente',
                    data: data //Retorna el id del registro
                });
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'El password es incorrecto'
                });
            }
            
        });
    },

    register(req, res) {
        const user = req.body; //Captura los datos del cliente
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con el registro del usuario',
                    error: err
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