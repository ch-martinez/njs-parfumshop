const { pool } = require("../config/parfumshopBD")

const getAllCustomersFromDB = async () => {
    const connection = await pool.getConnection()
    const query = 'SELECT * FROM customers WHERE customer_deleted = 0'

    try {
        const [response] = await connection.query(query)
        return response
    } catch (error) {
        console.log('ERROR al obtener todos los clientes: ', error)
        return false
    } finally {
        connection && await connection.release()
    }
}

const getCustomerFromDB = async (customer_id) => {
    try {
        const [[rows]] = await pool.query(`
            SELECT 
                c.*
            FROM 
                customers c
            WHERE
                c.customer_id = ? AND customer_deleted = 0`, [customer_id]);
        return rows;
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        throw error;
    }
}

const updateCustomerInDB = async (id, customer) => {
    const connection = await pool.getConnection()

    const query = `
        UPDATE customers
        SET
            customer_name = ?,
            customer_lastname = ?,
            customer_dni = ?,
            customer_email = ?,
            customer_tel = ?,
            customer_obs = ?
        WHERE
            customer_id = ? AND customer_status = 1
    `
    const params = [
        customer.customer_name,
        customer.customer_lastname,
        customer.customer_dni,
        customer.customer_email,
        customer.customer_tel,
        customer.customer_obs,
        id]

    try {
        const response = await connection.query(query, params)
        return true
    } catch (error) {
        console.log('Error al actualizar cliente: ', error)
        return false
    } finally {
        connection && await connection.release()
    }
}

module.exports ={
    getAllCustomersFromDB,
    getCustomerFromDB,
    updateCustomerInDB
}