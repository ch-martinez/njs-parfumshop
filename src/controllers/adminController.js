const productsModel = require('../models/productsModel')
const brandsModel = require('../models/brandsModels')

const mainView = (req, res) => {
    let data = {
        title: 'Panel administración'
    };
    res.render('pages/admin/mainPage', { layout: 'layouts/adminPanelLayout', data });   
};

/* Customers */
const customersView = (req, res) => {
    let data = {
        title: 'Panel administración'
    };
    res.render('pages/admin/customersPage', { layout: 'layouts/adminPanelLayout', data });   
};


/* Products */
const productsView = async (req, res) => {
    const products = await productsModel.getAllProductsFromDB()
    //console.log(products)
    let data = {
        title: 'Panel administración',
        products: products
    };
    res.render('pages/admin/productsPage', { layout: 'layouts/adminPanelLayout', data });   
};

const productView = (req, res) => {
    let data = {
        title: 'Panel administración'
    };
    res.render('pages/admin/products/productPage', { layout: 'layouts/adminPanelLayout', data });   
};

const productNewView = (req, res) => {
    let data = {
        title: 'Panel administración'
    };
    res.render('pages/admin/products/productNewPage', { layout: 'layouts/adminPanelLayout', data });   
};

/* Brands */
const brandsView = async (req, res) => {
    const brands = await brandsModel.getAllBrandsFromDB()
    //console.log(brands)
    let data = {
        title: 'Panel administración',
        brands: brands
    };
    res.render('pages/admin/brands/brandsPage', { layout: 'layouts/adminPanelLayout', data });   
};

module.exports = {
    mainView,
    customersView,
    productsView,
    productView,
    productNewView,
    brandsView
};