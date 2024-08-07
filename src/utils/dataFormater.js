const calcDiscount = (price, discount) => {
    return discount === 0 ? price : (price * (100 - discount) / 100).toFixed()
}

function formatDateToArgentina(isoString) {
    // Crear un objeto Date a partir de la cadena ISO 8601
    const date = new Date(isoString);

    // Calcular la diferencia de zona horaria entre UTC y Argentina (UTC-3)
    const offset = -3 * 60; // -3 horas en minutos

    // Obtener la fecha y hora en Argentina
    const argentinaTime = new Date(date.getTime() + (offset * 60 * 1000));

    // Obtener los componentes de la fecha y la hora
    const day = String(argentinaTime.getUTCDate()).padStart(2, '0');
    const month = String(argentinaTime.getUTCMonth() + 1).padStart(2, '0'); // Los meses son base 0, por eso sumamos 1
    const year = argentinaTime.getUTCFullYear();
    const hours = String(argentinaTime.getUTCHours()).padStart(2, '0');
    const minutes = String(argentinaTime.getUTCMinutes()).padStart(2, '0');

    // Formatear la fecha y la hora según el formato requerido
    return `${day}-${month}-${year}, ${hours}:${minutes}hs`;
}

const datetimeFormarter = (datetime) => {
    console.log(datetime)
    const padZero = (value) => value.toString().padStart(2, '0');

    const year = datetime.getFullYear();
    const month = padZero(datetime.getMonth() + 1); // Los meses van de 0-11
    const day = padZero(datetime.getDate());
    const hours = padZero(datetime.getHours());
    const minutes = padZero(datetime.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/* EXPORTS */
const productFormFormater = (p) => {

    const productForm = {
        product_name: p.product_name,
        product_description: p.product_description,
        product_ml: Number(p.product_ml),
        product_family: p.product_family,
        product_gender: p.product_gender,
        product_type: p.product_type,
        //product_img: p.product_img,

        product_price_list: Number(p.product_price_list),
        product_price_sell: Number(p.product_price_sell),
        product_discount: Number(p.product_discount),
        payment_id: Number(p.payment_id),

        product_sku: p.product_sku,
        product_stock: Number(p.product_stock),
        product_status: p.product_status == 'on' ? true : false,
        product_flags: {
            new: p.pf_new == 'on' ? true : false,
            featured: p.pf_featured == 'on' ? true : false,
            topSeller: p.pf_topseller == 'on' ? true : false,
            promoted: p.pf_promoted == 'on' ? true : false
        },

        brand_id: Number(p.brand_id),
        provider_id: Number(p.provider_id),
    }
    return productForm
}


const productFormarter = (product) => {
    return {
        product_id: product.product_id,
        product_name: product.product_name,
        product_description: product.product_description,
        product_ml: product.product_ml,
        product_family: product.product_family,
        product_gender: product.product_gender,
        product_type: product.product_type,
        product_img: JSON.parse(product.product_img),
        product_img_url: JSON.parse(product.product_img_url),
        product_price_list: product.product_price_list,
        product_price_sell: product.product_price_sell,
        product_discount: product.product_discount,
        product_price_discount: calcDiscount(product.product_price_sell, product.product_discount),
        payment_quantity: product.payment_quantity,
        product_price_payments: product.payment_quantity == 0 ? 0 : (product.product_price_sell / product.payment_quantity).toFixed(),

        product_sku: product.product_sku,
        product_stock: product.product_stock,
        product_status: product.product_status == 0 ? false : true,
        product_flags: {
            new: product.pf_new == 1 ? true : false,
            featured: product.pf_featured == 1 ? true : false,
            topSeller: product.pf_topseller == 1 ? true : false,
            promoted: product.pf_promoted == 1 ? true : false
        },

        provider_id: product.provider_id,
        provider_name: product.provider_name,

        brand_id: product.brand_id,
        brand_name: product.brand_name,

        product_created: formatDateToArgentina(product.product_created),
        product_updated: formatDateToArgentina(product.product_updated),

    }
}

const productsListFormater = (productsList) => {
    let productsFormatedList = []

    productsList.forEach(product => {
        const productFormated = productFormarter(product)
        productsFormatedList.push(productFormated)
    })
    return productsFormatedList
}

/* BRAND */
const brandFormarter = (brand) => {
    return {
        brand_id: brand.brand_id,
        brand_name: brand.brand_name,
        brand_status: brand.brand_status == 1 ? true : false,
        brand_img: brand.brand_img,
        brand_created: formatDateToArgentina(brand.brand_created),
        brand_updated: formatDateToArgentina(brand.brand_updated),
/* 
        brand_flags: {
            new: brand.bf_new == 1 ? true : false,
            featured: brand.bf_featured == 1 ? true : false,
            topSeller: brand.bf_topseller == 1 ? true : false,
            promoted: brand.bf_promoted == 1 ? true : false
        } */
    }
}

const brandFormPostFormater = (b) => {
    const brandForm = {
        brand_name: b.brand_name,
        brand_status: b.brand_status == 'on' ? true : false,
        brand_flags: {
            new: b.bf_new == 'on' ? true : false,
            featured: b.bf_featured == 'on' ? true : false,
            topSeller: b.bf_topseller == 'on' ? true : false,
            promoted: b.bf_promoted == 'on' ? true : false
        }
    }
    return brandForm
}
/* Provider */

const providerFormPostFormater = (provider) => {
    const providerForm = {
        provider_id: provider.provider_id,
        provider_name: provider.provider_name,
        provider_email: provider.provider_email,
        provider_tel: provider.provider_tel,
        provider_address: provider.provider_address,
        provider_status: provider.provider_status == 'on' ? true : false,
        provider_obs: provider.provider_obs,
        provider_detail: provider.provider_detail
    }
    return providerForm
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

const statusCode = ["Creado","Programado","Activo","Finalizado","Suspendido"]

/* Coupons */
const couponFormarter = (coupon) => {
    const couponFormated = {
        coupon_id: coupon.coupon_id,
        coupon_title: coupon.coupon_title,
        coupon_description: coupon.coupon_description,
        coupon_obs: coupon.coupon_obs,
        coupon_code: coupon.coupon_code,
        coupon_discount: coupon.coupon_discount,
        coupon_usage: coupon.coupon_usage,
        coupon_start: datetimeFormarter(coupon.coupon_start),
        coupon_end: datetimeFormarter(coupon.coupon_end),
        coupon_statusCode: coupon.coupon_statusCode,
        coupon_statusName: statusCode[coupon.coupon_statusCode],

        coupon_status: coupon.coupon_status,
        coupon_created: formatDateToArgentina(coupon.coupon_created),
        coupon_updated: formatDateToArgentina(coupon.coupon_updated),
    }
    return couponFormated
}

const couponFormarterPost = (coupon) => {
    return {
        coupon_title: coupon.coupon_title,
        coupon_description: coupon.coupon_description,
        coupon_obs: coupon.coupon_obs,
        coupon_code: coupon.coupon_code,
        coupon_discount: coupon.coupon_discount,
        coupon_start: coupon.coupon_start,
        coupon_end: coupon.coupon_end,
        coupon_statusCode: coupon.coupon_statusCode,
        coupon_status: coupon.coupon_status == 'on' ? true : false,
    }
}

module.exports = {
    productFormarter,
    productFormFormater,
    brandFormarter,
    brandFormPostFormater,
    providerFormPostFormater,
    addressFormarter,
    productsListFormater,
    couponFormarter,
    couponFormarterPost,



    datetimeFormarter
}