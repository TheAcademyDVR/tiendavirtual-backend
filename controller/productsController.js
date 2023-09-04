const Product = require('../model/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

// params => usar en metodos => get & delete
// body => usar en metodos => put & post


module.exports = {

    findByCategory(req, res) {

        const id_category = req.params.id_category;

        Product.findByCategory(id_category,(err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con el listado de los productos',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

     create(req, res) {

        const product = JSON.parse(req.body.product);

        const files = req.files;

        let inserts = 0;

        if (files.length === 0) {
            return res.status(501).json({
                success: false,
                message: 'Existe un error con el registro del producto'
            });
        } else {

            Product.create(product, (err, id_product) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Existe un error con el registro del producto',
                        error: err
                    });
                }

                product.id = id_product;

                const start = async () => {

                    await asyncForEach(files, async (file) => {

                        const path = `Cyber_Link_Image_${Date.now()}`;
                        const url = await storage(file, path);

                        if (url != undefined && url != null) { // SE CREO LA IMAGEN EN FIREBASE
                            if (inserts == 0) {
                                product.image1 = url;
                            } else if (inserts == 1) {
                                product.image2 = url;
                            } else if (inserts == 2) {
                                product.image3 = url;
                            }
                        }

                        await Product.update(product, (err, data) => {
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Existe un error con el registro del producto',
                                    error: err
                                });
                            }
                            inserts = inserts + 1;
                            if (inserts == files.length) {
                                return res.status(201).json({
                                    success: false,
                                    message: 'El producto se guardo correctamente',
                                    data: data
                                })
                            }
                        });
                    });
                }
                start();
            });
        }
    },

    
    update(req, res) {

        const product = req.body;

        Product.update(product, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con la actualizacion del product',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El producto se actualizo exitosomente',
                data: data //Retorna el id del registro
            });
        });
    },


    updateWithImage(req, res) {

        const product = JSON.parse(req.body.product);

        const files = req.files;

        let inserts = 0;

        if (files.length === 0) {
            return res.status(501).json({
                success: false,
                message: 'Existe un error con el registro del producto'
            });
        } else {

            Product.update(product, (err, id_product) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Existe un error con el registro del producto',
                        error: err
                    });
                }

                product.id = id_product;

                const start = async () => {

                    await asyncForEach(files, async (file) => {

                        const path = `Cyber_Link_Image_${Date.now()}`;
                        const url = await storage(file, path);

                        if (url != undefined && url != null) { // SE CREO LA IMAGEN EN FIREBASE
                            if (inserts == 0) {
                                product.image1 = url;
                            } else if (inserts == 1) {
                                product.image2 = url;
                            } else if (inserts == 2) {
                                product.image3 = url;
                            }
                        }

                        await Product.update(product, (err, data) => {
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Existe un error con el registro del producto',
                                    error: err
                                });
                            }
                            inserts = inserts + 1;
                            if (inserts == files.length) {
                                return res.status(201).json({
                                    success: false,
                                    message: 'El producto se actualizo correctamente',
                                    data: data
                                })
                            }
                        });
                    });
                }
                start();
            });
        }
    },

   
    delete(req, res) {

        const id = req.params.id;

        Product.delete(id,(err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error al eliminar el producto',
                    error: err
                });
            }
            return res.status(201).json({
                success: false,
                message: 'El producto se ha eliminado correctamente',
                data: `${id}`
            });
        });
    },

}