const customerModel = require('../models/customerModel')
const cadressModel = require('../models/customerAddressModel')
const mainLayout = 'layouts/mainLayout'
const formarter = require('../utils/dataFormater')

const cAddressAllView = async (req, res) => {
    const cid = req.params.cid
    const data = {
        title: 'Direcciones',
        customer: formarter.customerFormater(await customerModel.getCustomerFromDB(cid)),
        addressList: formarter.addressListFormarter(await cadressModel.getAllCAdressFromDB(cid))
    }
    res.render('pages/customers/cAddress/cAddressView', {layout: mainLayout, data: data})
}

const cAddressDetailView = async (req, res) => {
    const cid = req.params.cid
    const caid = req.params.caid

    const data = {
        title: 'Direccion',
        customer: formarter.customerFormater(await customerModel.getCustomerFromDB(cid)),
        caddress: formarter.addressFormarter(await cadressModel.getCAdressFromDB(cid, caid))
    }
    res.render('pages/customers/cAddress/cAddressDetailPage', {layout: mainLayout, data: data})
}

module.exports = {
    cAddressAllView,
    cAddressDetailView
}