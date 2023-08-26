const connection = require('../config/connection');
const Category = {};

Category.getAll = (result) => {
    const sql = `
        SELECT id,name,description,image 
            FROM categories
        ORDER BY name
    `;
    connection.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error consulta de categorias es: ', err);
                result(err, null);
            } else {
                console.log('Id de la nueva categoria obtenido: ', data);
                result(null, data);
            }
        }
    )
},


Category.create = (category, result) => {

    const sql = `
INSERT INTO 
    categories(name,description,image,created_at,updated_at)
VALUES(?,?,?,?,?)
`;
    connection.query(
        sql,
        [
            category.name,
            category.description,
            category.image,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error de Categoria es: ', err);
                result(err, null);
            } else {
                console.log('Categoria  obtenido:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
},

Category.update = (category, result) => {
    const sql = `
    UPDATE 
        categories
    SET
        name=?,
        description=?,
        image=?,
        updated_at=?
    WHERE
        id=?            
    `;
    connection.query(
        sql,
        [
            category.name,
            category.description,
            category.image,
            new Date(),
            category.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error de modificar es: ', err);
                result(err, null);
            } else {
                console.log('Categoria actualizada:', category.id);
                result(null, category.id);
            }
        }
    )
},

Category.delete = (id, result) => {
    const sql = `
    DELETE FROM 
        categories
        WHERE 
        id=?    
`;
    connection.query(
        sql,
        id,
        (err, res) => {
            if (err) {
                console.log('Error en delete category: ', err);
                result(err, null);
            } else {
                console.log('Id de la categoria eliminada:', id);
                result(null, id);
            }
        }
    )
}

module.exports = Category;