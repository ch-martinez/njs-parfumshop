const { pool } = require('../config/parfumshopBD')

const getAllCustomerOrdersFromDB = async (cid) => {
    const connection = await pool.getConnection()

    const query = `
        SELECT *
        FROM orders o
        INNER JOIN order_status os ON os.order_id = o.order_id
        WHERE customer_id = ?;`

    try {
        const [response] = await connection.query(query, cid)
        return response
    } catch (error) {
        console.log('ERROR al obtener todas las ordenes del cliente: ', error)
        return false
    } finally {
        connection && await connection.release()
    }
}

const getOrderFromDB = async (oid) => {
    const connection = await pool.getConnection()

    const queryOrder = `
        SELECT *
        FROM orders o
        INNER JOIN order_customer oc ON oc.order_id = o.order_id
        INNER JOIN order_shipping os ON os.order_id = o.order_id
        INNER JOIN order_status ost ON ost.order_id = o.order_id
        WHERE o.order_id = ?
    `

    const queryProductList = `
        SELECT *
        FROM order_product_list
        WHERE order_id = ?`

    try {
        const [[order]] = await connection.query(queryOrder, oid)
        const [productList] = await connection.query(queryProductList, oid)

        return {order: order, productList: productList}
    } catch (error) {
        console.log('ERROR al obtener orden: ', error)
        return false
    } finally {
        connection && await connection.release()
    }
}

module.exports = {
    getAllCustomerOrdersFromDB,
    getOrderFromDB
}