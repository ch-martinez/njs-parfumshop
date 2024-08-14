const { pool } = require('../config/parfumshopBD')

const getAllPaymentsMethodsFromDB = async () => {
    const connection = await pool.getConnection()

    try {
        const [response] = await connection.query('SELECT * FROM payment_methods WHERE pm_deleted = 0')
        return response
    } catch (error) {
        console.log('ERROR al obtener todos los metodos de pago: ', error)
        return false
    } finally {
        if (connection) await connection.release()
    }
}

const getPaymentMethodFromDB = async (id) => {
    const connection = await pool.getConnection()
    const query = 'SELECT * FROM payment_methods WHERE pm_id = ? AND pm_deleted = 0'
    try {
        const [[response]] = await connection.query(query, id)
        return response
    } catch (error) {
        console.log('Error al obtener el metodo de pago: ', error)
        return false
    } finally {
        if (connection) await connection.release()
    }
}

module.exports = {
    getAllPaymentsMethodsFromDB,
    getPaymentMethodFromDB
}