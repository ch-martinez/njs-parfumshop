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

const flagsToObject = (flags) => {
    flagsStr = flags.toString()
    let flagsObject = {
        new: flagsStr[0] == 1 ? true : false,
        promoted: flagsStr[1] == 1 ? true : false,
        featured: flagsStr[2] == 1 ? true : false,
        topSeller: flagsStr[3] == 1 ? true : false,
    }
    return flagsObject
}

function convertObjectToBinaryString(obj) {
    // Ordenar las claves para garantizar el orden correcto
    const keys = ['new', 'promoted', 'featured', 'topSeller'];
    let binaryString = '';
    
    keys.forEach(key => {
      binaryString += obj[key] ? '1' : '0';
    });
    
    return(binaryString);
  }

const flagsToArray = (obj) => {
    const keys = ['new', 'promoted', 'featured', 'topSeller'];
    let binaryString = '';

    keys.forEach(key => {
      binaryString += obj[key] ? '1' : '0';
    });

    return(binaryString);
}




/* EXPORTS */
const productFormFormater = (p) => {

    const flags = {
        new: p.flag_new == 'on' ? true : false,
        promoted: p.flag_promoted == 'on' ? true : false,
        featured: p.flag_featured == 'on' ? true : false,
        topSeller: p.flag_topSeller == 'on' ? true : false,
    }

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

        product_sku: Number(p.product_sku),
        product_stock: Number(p.product_stock),
        product_status: p.product_status == 'on' ? true : false,
        product_flags: flagsToArray(flags),

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
        product_img: product.product_img,

        product_price_list: product.product_price_list,
        product_price_sell: product.product_price_sell,
        product_discount: product.product_discount,
        product_price_discount: calcDiscount(product.product_price_sell, product.product_discount),
        payment_quantity: product.payment_quantity,
        product_price_payments: (product.product_price_sell / product.payment_quantity).toFixed(),

        product_sku: product.product_sku,
        product_stock: product.product_stock,
        product_status: product.product_status == 0 ? false : true,
        product_flags: flagsToObject(product.product_flags),

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
    productFormarter,
    productFormFormater,
    addressFormarter,
    productsListFormater
}