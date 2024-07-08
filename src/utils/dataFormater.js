const calcDiscount = (price, discount) => {
    return discount === 0 ? 0 : (price * (100 - discount) / 100).toFixed()
}

const productCardFormarter = (products) => {
    const productsFormated = []

    products.forEach(product => {
        productsFormated.push({
            product_sku: product.product_sku,
            product_new: product.product_new == 1 ? false : true,
            product_img: product.product_img,
            brand_name: product.brand_name,
            product_name: product.product_name,
            product_discount: product.product_discount,
            product_payments: product.product_payments,
            product_price: product.product_price,
            product_price_discount: calcDiscount(product.product_price, product.product_discount),
            product_price_payments: (product.product_price / product.product_payments).toFixed(),
        })
    })
    return productsFormated
}

const productFormarter = (product) => {
    return {
        product_sku: product.product_sku,
        product_new: product.product_new == 1 ? false : true,
        product_img: product.product_img,
        brand_name: product.brand_name,
        product_name: product.product_name,
        product_discount: product.product_discount,
        product_payments: product.product_payments,
        product_price: product.product_price,
        product_price_discount: calcDiscount(product.product_price, product.product_discount),
        product_price_payments: (product.product_price / product.product_payments).toFixed(),
        product_description: product.product_description,
        product_ml: product.product_ml,
        product_gender: product.product_gender,
        product_type: product.product_type,
        product_notes: product.product_notes,
        product_stock: product.product_stock,
    }
}

/* Address Formater */
const addressFormarter = (addressList) => {

    const fullAddress = (address) => {
        if (address.caddress_apartment) {
            return `${address.caddress_street} ${address.caddress_number}, Piso: ${address.caddress_floor}, Dpto: ${address.caddress_apartment}`
        } else {
            return `${address.caddress_street} ${address.caddress_number}`
        }
    }

    let addressFormatedList = []

    addressList.forEach(address => {
        const addressFormated = {
            caddress_id: address.caddress_id,
            caddress_street: address.caddress_street,
            caddress_number: address.caddress_number,
            caddress_floor: address.caddress_floor,
            caddress_apartment: address.caddress_apartment,
            caddress_full: fullAddress(address),
            caddress_city: address.caddress_city,
            caddress_state: address.caddress_state,
            caddress_zip: address.caddress_zip,
            caddress_obs: address.caddress_obs,
            caddress_create_time: address.caddress_create_time
        }
        addressFormatedList.push(addressFormated)
    })
    return addressFormatedList
}

const paymentsFormarter = (paymentsList) => {
    let paymentsFormatedList = []

    paymentsList.forEach(payment => {
        const paymentFormated = {
            pm_id: payment.pm_id,
            pm_sku: payment.pm_sku,
            pm_name: payment.pm_name,
            pm_description: payment.pm_description,
            pm_status: payment.pm_status == 1 ? false : true,
        }
        paymentsFormatedList.push(paymentFormated)
    })
    return paymentsFormatedList
}

module.exports = {
    productCardFormarter,
    productFormarter,
    addressFormarter
}