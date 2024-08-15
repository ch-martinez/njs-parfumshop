const dataFormater = require('../utils/dataFormater');
const brandsModel = require('../models/brandsModel')
const productsModel = require('../models/productsModel')

// VIEW: Todas las marcas
const brandsView = async (req, res) => {
    const brands = await brandsModel.getAllBrandsFromDB()
    const data = {
        title: 'Marcas - administración',
        brands: brands
    }
    res.render('pages/brands/brandsPage', {layout: 'layouts/mainLayout', data})
}

// VIEW: Nueva marca
const brandNewView = async (req, res) => {
    const data = {
        title: 'Marcas - administración',
    }
    res.render('pages/brands/brandNewPage', {layout: 'layouts/mainLayout', data})
}

// POST: Nueva marca
const brandNewPost = async (req, res) => {
    const response = await brandsModel.newBrandInDB(dataFormater.brandFormPostFormater(req.body))
    if (response) {
        res.status(200).json({success: true, message: 'Marca añadida', id: response.product_id})
    }else{
        res.status(500).send('Error al añadir nueva marca')
    }
}

// VIEW: Editar marca
const brandEditView = async (req, res) => {
    const brand = dataFormater.brandFormarter(await brandsModel.getBrandFromDB(req.params.id))
    const data = {
        title: 'Marcas - administración',
        brand: brand
    }
    res.render('pages/brands/brandEditPage', {layout: 'layouts/mainLayout', data})
}

// POST: Editar marca
const brandEditPost = async (req, res) => {
    const id = req.params.id
    const response = await brandsModel.updateBrandInDB(id, dataFormater.brandFormPostFormater(req.body))
    if (response) {
        res.status(200).json({success: true, message: 'Marca actualizada', id: id})
    }else{
        res.status(500).send('Error al actualizar la marca')
    }
}

// POST: Eliminar marca
const brandDeletePost = async (req, res) => {
    const response = await brandsModel.logicDeleteBrandInDB(req.body.id) 
    if (response) {
        res.status(200).json({success: true, message: 'Marca eliminada'})
    }else{
        res.status(500).send('Error al eliminar la marca')
    }
}

// POST: Cambiar el estado de una marca
const brandStatusPost = async (req, res) => {
    const response = await brandsModel.updateBrandStatusInDB(req.params.id, req.params.status)
    if (response) {
        res.status(200).json({success: true, message: 'Estado actualizado'})
    }else{
        res.status(500).send('Error al actualizar el estado')
    }
}

// VIEW: Detalle de la marca
const brandDetailView = async (req, res) => {
    const brand = await brandsModel.getBrandFromDB(req.params.id)
    const brandFormated = dataFormater.brandFormarter(brand)
    let products = await productsModel.getAllProductsFromDB({brand_id: req.params.id})
    products = dataFormater.productsListFormater(products)
    const counters = {
        totalProducts: await productsModel.counterProductsInDB({brand_id: req.params.id}),
        totalActiveProducts: await productsModel.counterProductsInDB({brand_id: req.params.id, status: 1}),
    }
    const data = {
        title: 'Marcas - administración',
        brand: brandFormated,
        products: products,
        counters: counters
    }
    res.render('pages/brands/brandDetailPage', {layout: 'layouts/mainLayout', data})
}

module.exports = {
    brandsView,
    brandNewView,
    brandNewPost,
    brandEditView,
    brandEditPost,
    brandDeletePost,
    brandStatusPost,
    brandDetailView,
}