const connection = require('../config/connection');
const Product = {};

Product.findByCategory = (id_category, result) => {
    const sql = `
            SELECT 
                P.id,
                P.name,
                P.description,
                P.price,
                P.image1,
                P.image2,
                P.image3,
                P.id_category
            FROM
                products AS P 
            WHERE
                P.id_category = ?       
            `;
    connection.query(
        sql,
        [id_category],
        (err, res) => {
            if (err) {
                console.log('Error al listar los productos => ', err);
                result(err, null);
            } else {
                console.log('Lista productos obtenidos => ', res);
                result(null, res);
            }
        });
},

    Product.create = (product, result) => {

        const sql = `
    INSERT INTO 
        products(
            name,
            description,
            price, 
            image1, 
            image2, 
            image3, 
            id_category, 
            created_at,
            updated_at)
    VALUES(?,?,?,?,?,?,?,?,?)
    `;
        connection.query(
            sql,
            [
                product.name,
                product.description,
                product.price,
                product.image1,
                product.image2,
                product.image3,
                product.id_category,
                new Date(),
                new Date()
            ],
            (err, res) => {
                if (err) {
                    console.log('Error de nuevo producto es: ', err);
                    result(err, null);
                } else {
                    console.log('Nuevo producto  obtenido:', res.insertId);
                    result(null, res.insertId);
                }
            }
        )
    },

    Product.update = (product, result) => {

        const sql = `
    UPDATE 
        products
    SET 
        name=?,
        description=?,
        price=?,
        image1=?,
        image2=?, 
        image3=?, 
        id_category=?, 
        updated_at=?
    WHERE
        id=?    
    `;
        connection.query(
            sql,
            [
                product.name,
                product.description,
                product.price,
                product.image1,
                product.image2,
                product.image3,
                product.id_category,
                new Date(),
                product.id
            ],
            (err,) => {
                if (err) {
                    console.log('Error de nuevo producto es: ', err);
                    result(err, null);
                } else {
                    console.log('Id del producto actualizado obtenido:', product.id);
                    result(null, product.id);
                }
            }
        )
    },

    Product.delete = (id, result) => {
        const sql = `
        DELETE FROM
            products
        WHERE
            ID = ?    
    `;

        connection.query(
            sql,
            [id],
            (err, res) => {
                if (err) {
                    console.log('Error al eliminar el producto => ', err);
                    result(err, null);
                } else {
                    console.log('El producto eliminado con el id => ', id);
                    result(null, id);
                }
            }
        )
    }

module.exports = Product;