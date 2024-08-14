const dataFormater = require('../utils/dataFormater');
const providersModel = require('../models/providersModel')
const productsModel = require('../models/productsModel')

// VIEW: Todos los proveedores
const providerView = async (req, res) => {
    let providers = await providersModel.getAllProvidersFromDB()

    let data = {
        title: 'Panel administración',
        providers: providers
    }
    res.render('pages/providers/providersPage', { layout: 'layouts/mainLayout', data });
}

// VIEW: Nuevo proveedor
const providerNewView = async (req, res) => {
    let data = {
        title: 'Panel administración',
    }
    res.render('pages/providers/providerNewPage', { layout: 'layouts/mainLayout', data });
}

// POST: Nuevo proveedor
const providerNewPost = async (req, res) => {
    const response = await providersModel.newProviderInDB(dataFormater.providerFormPostFormater(req.body))
    if (response) {
        res.status(200).json({success: true, message: 'Proveedor añadido', id: response.provider_id})
    }else{
        res.status(500).send('Error al añadir nuevo proveedor')
    }
}

// VIEW: Editar proveedor
const providerEditView = async (req, res) => {
    const provider = await providersModel.getProviderFromDB(req.params.id)
    let data = {
        title: 'Panel administración',
        provider: provider
    }
    res.render('pages/providers/providerEditPage', { layout: 'layouts/mainLayout', data });
}

// POST: Editar proveedor
const providerEditPost = async (req, res) => {
    const response = await providersModel.updateProviderInDB(req.params.id, dataFormater.providerFormPostFormater(req.body))
    if (response) {
        res.status(200).json({success: true, message: 'Proveedor actualizado', id: req.params.id})
    }else{
        res.status(500).send('Error al actualizar el proveedor')
    }
}

// POST: Eliminar proveedor
const providerDeletePost = async (req, res) => {
    const response = await providersModel.logicDeleteProviderInDB(req.params.id) 
    if (response) {
        res.status(200).json({success: true, message: 'Proveedor eliminado'})
    }else{
        res.status(500).send('Error al eliminar el proveedor')
    }
}

// POST: Cambiar el estado de una marca
const providerStatusPost = async (req, res) => {
    const response = await providersModel.updateProviderStatusInDB(req.params.id, req.params.status)
    if (response) {
        res.status(200).json({success: true, message: 'Estado actualizado'})
    }else{
        res.status(500).send('Error al actualizar el estado')
    }
}

// VIEW: Detalle del proveedor
const providerDetailView = async (req, res) => {

    let products = await productsModel.getAllProductsFromDB({provider_id: req.params.id})
    products = dataFormater.productsListFormater(products)
    const counters = {
        totalProducts: await productsModel.counterProductsInDB({provider_id: req.params.id}),
        totalActiveProducts: await productsModel.counterProductsInDB({provider_id: req.params.id, status: 1}),
    }
    const provider = await providersModel.getProviderFromDB(req.params.id)
    let data = {
        title: 'Panel administración',
        provider: provider,
        products: products,
        counters: counters
    }
    res.render('pages/providers/providerDetailPage', { layout: 'layouts/mainLayout', data });
}

module.exports = {
    providerView,
    providerNewView,
    providerNewPost,
    providerEditView,
    providerEditPost,
    providerDeletePost,
    providerStatusPost,
    providerDetailView
}