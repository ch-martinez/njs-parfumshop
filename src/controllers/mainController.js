const {getAllProductsMinFromDB} = require('../models/productsModel')
const {productCardFormarter} = require('../utils/dataFormater')

const homeView = async (req, res) => {
    const data = {
        title: "ParfumShop",
        products: [],
        productsAll: [],
    }
    const products = productCardFormarter(await getAllProductsMinFromDB())
    data.products = [products[0], products[1]]
    data.productsAll = products
    res.render('pages/main/home/homePage', { layout: 'layouts/mainLayout', data })
}

module.exports = {
    homeView
}