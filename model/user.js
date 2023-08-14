const connection = require('../config/connection');
const bcrypt = require('bcryptjs');


const User = {};

User.findById = (id, result) => {
    const sql = `
    SELECT 
        U.id, 
        U.email, 
        U.name, 
        U.lastname, 
        U.image, 
        U.phone, 
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) as roles
    FROM users U
        INNER JOIN user_has_roles UHR ON UHR.id_user = U.id
        INNER JOIN roles R ON UHR.id_rol = R.id
    WHERE U.id = ?
        GROUP BY U.id
    `;
    connection.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error es: ', err);
                result(err, null);
            } else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    );
}

User.findByEmail = (email, result) => {
    const sql = `
    SELECT 
        U.id, 
        U.email, 
        U.name, 
        U.lastname, 
        U.image, 
        U.phone, 
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) as roles
    FROM users U
        INNER JOIN user_has_roles UHR ON UHR.id_user = U.id
        INNER JOIN roles R ON UHR.id_rol = R.id
    WHERE U.email = ?
        GROUP BY U.id

    `;
    connection.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error es: ', err);
                result(err, null);
            } else {
                console.log('El usuario obtenido es: ', user[0]);
                result(null, user[0]);
            }
        }
    );
}

User.create = async (user, result) => {

    const hashPassword = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO 
            users(name, lastname, email, phone, image, password, created_at, updated_at)
        VALUES(?,?,?,?,?,?,?,?)
    `;
    connection.query(
        sql,
        [user.name, user.lastname, user.email, user.phone, user.image, hashPassword, new Date(), new Date()],
        (err, res) => {
            if (err) {
                console.log('Error en usuarios es: ', err);
                result(err, null);
            } else {
                console.log('Id del usuario es: ', res.insertId);
                result(null, res.insertId);
            }
        }


    )
}

module.exports = User;