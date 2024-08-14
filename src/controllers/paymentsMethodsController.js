const pmModel = require('../models/paymentsMethodsModel')
const pModel = require('../models/paymentsModel')
const mainLayout = 'layouts/mainLayout'


const paymentsMethodsView = async (req, res) => {
    const pms = await pmModel.getAllPaymentsMethodsFromDB()
    const data = {
        title: 'Metodos de pago',
        pms: pms
    }
    res.render('pages/paymentsMethods/paymentsMethodsPage.ejs', {layout: mainLayout, data: data})
}

//
const paymentMethodNewView = async (req, res) => {
}

//
const paymentMethodNewPost = async (req, res) => {
}

//
const paymentMethodEditView = async (req, res) => {
}

//
const paymentMethodEditPost = async (req, res) => {
}

//
const paymentMethodDeletePost = async (req, res) => {
}

//
const paymentMethodStatusPost = async (req, res) => {
}

//
const paymentMethodDetailView = async (req, res) => {
    const pm = await pmModel.getPaymentMethodFromDB(req.params.id)
    const data = {
        title: 'Metodo de pago',
        pm: pm,
        payments: {
            status: false,
            data: req.params.id == 3 ? await pModel.getAllPaymentsFromDB() : null
        }
    }
    console.log(data)
    res.render('pages/paymentsMethods/paymentMethodDetailPage', {layout: mainLayout, data: data})
}


module.exports = {
    paymentsMethodsView,
    paymentMethodNewView,
    paymentMethodNewPost,
    paymentMethodEditView,
    paymentMethodEditPost,
    paymentMethodDeletePost,
    paymentMethodStatusPost,
    paymentMethodDetailView,
}