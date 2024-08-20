const { pool } = require("../config/parfumshopBD")

const getAllCAdressFromDB = async (customer_id) => {
    const connection = await pool.getConnection()
    const query = 'SELECT * FROM customers_address WHERE cadress_deleted = 0 AND customer_id = ?'

    try {
        const [response] = await connection.query(query, customer_id)
        return response
    } catch (error) {
        console.log('ERROR al obtener todas las direcciones: ', error)
        return false
    } finally {
        connection && await connection.release()
    }
}

const getCAdressFromDB = async (customer_id, caddress_id) => {
    const connection = await pool.getConnection()

    const query = `
        SELECT 
            *
        FROM 
            customers_address
        WHERE
            customer_id = ?
            AND caddress_id = ?`

    try {
        const [[response]] = await connection.query(query, [customer_id, caddress_id]);
        return response;
    } catch (error) {
        console.error('Error al obtener todas las direcciones:', error);
        throw error;
    } finally {
        connection && connection.release()
    }
}

module.exports ={
    getAllCAdressFromDB,
    getCAdressFromDB
}