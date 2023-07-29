const connection = require('../config/connection');

const User = {};

User.create = (user, result) => {
    const sql = `
        INSERT INTO 
            usuarios(nombre, apellido, email, telefono, imagen, clave, creado, modificado)
        VALUES(?,?,?,?,?,?,?,?)
    `;
    connection.query(
        sql,
        [ user.nombre, user.apellido, user.email, user.telefono, user.imagen,  user.clave, new Date(), new Date() ],
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