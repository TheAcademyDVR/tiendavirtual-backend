const connection = require('../config/connection');
const  bcrypt = require('bcryptjs');

const User = {};

User.create = async (user, result) => {

    const hashClave = await bcrypt.hash(user.clave, 10);

    const sql = `
        INSERT INTO 
            usuarios(nombre, apellido, email, telefono, imagen, clave, creado, modificado)
        VALUES(?,?,?,?,?,?,?,?)
    `;
    connection.query(
        sql,
        [ user.nombre, user.apellido, user.email, user.telefono, user.imagen,  hashClave, new Date(), new Date() ],
        (err, res) =>{
            if(err){
                console.log('Error en usuarios es: ',err);
                result(err, null);
            }else{
                console.log('Id del usuario es: ',res.insertId);
                result(null, res.insertId);
            }
        }


    )
}

module.exports = User;