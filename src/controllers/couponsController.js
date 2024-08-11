const formater = require('../utils/dataFormater.js')
const model = require('../models/couponsModel.js')

// VIEW: Todos los cupones
const couponsView = async (req, res) => {
    const coupons = await model.getAllCouponsFromDB()
    const data = {
        title: 'Cupones de descuento',
        coupons: coupons
    }
    res.render('pages/coupons/couponsPage', {layout: 'layouts/mainLayout', data: data})
}

// VIEW: Nuevo cupon
const couponNewView = async (req, res) => {
    const data = {
        title: 'Nuevo',
        actualDatetime: await formater.datetimeFormarter(new Date())
    }

    res.render('pages/coupons/couponNewPage', {layout: 'layouts/mainLayout', data: data})
}

// POST: Nuevo cupon
const couponNewPost = async (req, res) => {
    const response = await model.insertCouponInDB(formater.couponFormarterPost(req.body))
    if (response) {
        res.status(200).json({success: true, message: 'Cupón añadido', id: response.coupon_id})
    } else {
        res.status(500).send('Error al crear el cupon')
    }
}

// VIEW: Editar cupon
const couponEditView = async (req, res) => {
    const modelResp = await model.getCouponFromDB(req.params.id)
    const coupon = formater.couponFormarter(modelResp)
    const data = {
        title: '',
        actualDatetime: await formater.datetimeFormarter(new Date()),
        coupon: coupon
    }
    res.render('pages/coupons/couponEditPage.ejs', {layout: 'layouts/mainLayout', data: data})
}

// POST: Editar cupon
const couponEditPost = async (req, res) => {
    const response = await model.updateCouponInDB(req.params.id, formater.couponFormarterPost(req.body))
    if (response){
        res.status(200).json({success: true, message: 'Codigo actualizado', id: req.params.id})
    } else {
        res.status(500).send('Error al actualizar el producto')
    }
}

// POST: Eliminar cupon
const couponDeletePost = async (req, res) => {
    const response = await model.logicDeleteCouponInDb(req.params.id)
    if (response) {
        res.status(200).json({success: true, message: 'Cupon eliminado'})
    } else {
        res.status(500).send('Error al eliminar el cupon')
    }
}

// POST: Cambiar el estado del cupon
const couponStatusPost = async (req, res) => {
    const response = await model.updateStatusInDB(req.params.id, req.params.status)
    if (response) {
        res.status(200).json({success:true, message: 'Estado actualizado'})
    } else {
        res.status(500).send('Error al actualizar el estado')
    }
}

// VIEW: Detalle del cupon
const couponDetailView = async (req, res) => {
    const modelResp = await model.getCouponFromDB(req.params.id)
    const coupon = formater.couponFormarter(modelResp)
    const data = {
        title: '',
        coupon: coupon
    }
    res.render('pages/coupons/couponDetailPage', {layout: 'layouts/mainLayout', data: data})
}

module.exports = {
    couponsView,
    couponNewView,
    couponNewPost,
    couponEditView,
    couponEditPost,
    couponDeletePost,
    couponStatusPost,
    couponDetailView
}