const Category = require('../model/category');
const storage = require('../utils/cloud_storage')


module.exports = {

    async getAll(req, res) {
        Category.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con el listado de la categoria',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

    async create(req, res) {

        const category = JSON.parse(req.body.category); //Captura los datos del cliente

        const files = req.files;

        if (files.length > 0) {
            const path = `Cyber_Link_Image_Category_${Date.now()}`;
            const url = await storage(files[0], path);
            if (url != undefined && url != null) {
                category.image = url;
            }
        }
        Category.create(category, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con el registro de la categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Categoria registrado exitosomente',
                data: `${id}` //Retorna el id del registro
            });
        });
    },

    async updateWithImage(req, res) {

        const category = JSON.parse(req.body.category); //Captura los datos del cliente

        const files = req.files;

        if (files.length > 0) {
            const path = `Cyber_Link_Image_Category_${Date.now()}`;
            const url = await storage(files[0], path);
            if (url != undefined && url != null) {
                category.image = url;
            }
        }
        Category.update(category, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con la actualizacion de la categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La categoria se actualizo exitosomente',
                data: `${id}`
            });
        });
    },
    async update(req, res) {

        const category = req.body; 
        
        Category.update(category, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con la actualizacion de la categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La categoria se actualizo exitosomente',
                data: `${id}` //Retorna el id del registro
            });
        });
    },

    async delete(req, res) {
        const id = req.params.id;
        Category.delete(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con al eliminar una categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Categoria eliminada de manera exitosa',
                data: `${id}`
            });
        });
    }
}
