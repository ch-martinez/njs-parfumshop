const dataFormater = require('../utils/dataFormater');

const productsModel = require('../models/productsModel')
const brandsModel = require('../models/brandsModel')
const providersModel = require('../models/providersModel');
const paymentsModel = require('../models/paymentsModel')

// VIEW: Todos los productos
const productsView = async (req, res) => {
    const lowStock = 25
    const payments = await paymentsModel.getAllPaymentsFromDB()
    const counters = {
        totalProducts: await productsModel.counterProductsInDB({}),
        totalActiveProducts: await productsModel.counterProductsInDB({status: 1}),
        lowStockProducts: await productsModel.counterProductsInDB({stock: lowStock})
    }

    let products = await productsModel.getAllProductsFromDB(req.query)
    products = dataFormater.productsListFormater(products)

    let data = {
        title: 'Panel administración',
        products: products,
        counters: counters,
        payments: payments,
        lowStock: lowStock,
        filter: req.query
    }
    res.render('pages/products/productsPage', { layout: 'layouts/mainLayout', data });
}

// VIEW: Nuevo producto
const productNewView = async (req, res) => {
    const brands = await brandsModel.getAllBrandsFromDB()
    const payments = await paymentsModel.getAllPaymentsFromDB()
    const providers = await providersModel.getAllProvidersFromDB()
    let data = {
        title: 'Panel administración',
        brands: brands,
        payments: payments,
        providers: providers
    }
    res.render('pages/products/productNewPage', { layout: 'layouts/mainLayout', data });
}

// POST: Nuevo producto
const productNewPost = async (req, res) => {
    const response = await productsModel.newProductInDB(dataFormater.productFormFormater(req.body))
    if (response) {
        res.status(200).json({success: true, message: 'Producto añadido', id: response.product_id})
    }else{
        res.status(500).send('Error al actualizar el producto')
    }
}

// VIEW: Editar producto
const productEditView = async (req, res) => {
    const product = await productsModel.getProductFromDB(req.params.id)
    const brands = await brandsModel.getAllBrandsFromDB()
    const payments = await paymentsModel.getAllPaymentsFromDB()
    const providers = await providersModel.getAllProvidersFromDB()
    let data = {
        title: 'Panel administración',
        product: dataFormater.productFormarter(product),
        brands: brands,
        payments: payments,
        providers: providers
    }
    res.render('pages/products/productEditPage', { layout: 'layouts/mainLayout', data });
}

// POST: Editar producto
const productEditPost = async (req, res) => {
    const response = await productsModel.updateProductInDB(req.params.id, dataFormater.productFormFormater(req.body))
    if (response) {
        res.status(200).json({success: true, message: 'Producto actualizado', id: req.params.id})
    }else{
        res.status(500).send('Error al actualizar el producto')
    }
}

// POST: Eliminar producto
const productDeletePost = async (req, res) => {
    const response = await productsModel.logicDeleteProductInDB(req.body.id) 
    if (response) {
        res.status(200).json({success: true, message: 'Producto eliminado'})
    }else{
        res.status(500).send('Error al eliminar el producto')
    }
}

// POST: Cambiar el estado del producto
const productStatusPost = async (req, res) => {
    const response = await productsModel.updateProductStatusInDB(req.params.id, req.params.status)
    if (response) {
        res.send(true)
    }else{
        res.send('Error al actualizar el estado del producto')
    }
}

// VIEW: Detalle del producto
const productDetailView = async (req, res) => {
    const product = await productsModel.getProductFromDB(req.params.id)
    const productFormated = dataFormater.productFormarter(product)
    console.log(productFormated)
    let data = {
        title: 'Panel administración',
        product: productFormated
    }
    res.render('pages/products/productDetailPage', { layout: 'layouts/mainLayout', data });
}

module.exports = {
    productsView,
    productNewView,
    productNewPost,
    productEditView,
    productEditPost,
    productDeletePost,
    productStatusPost,
    productDetailView
}