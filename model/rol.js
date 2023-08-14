const connection = require('../config/connection');

const Rol = {};

Rol.create = (id_user, id_rol, result) => {
    const sql = `
        INSERT INTO user_has_roles(id_user, id_rol, created_at, updated_at)
        VALUES(?,?,?,?)
    `;
    connection.query(
        sql,
        [id_user, id_rol, new Date(), new Date()],
        (err, res) => {
            if (err) {
                console.log('Error de Rol es: ', err);
                result(err, null);
            } else {
                console.log('Rol obtenido:', res.insertId);
                result(null, res.insertId);
            }
        }
    );
}

module.exports = Rol;
