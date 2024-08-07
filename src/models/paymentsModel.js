const { pool } = require('../config/parfumshopBD')

const getAllPaymentsFromDB = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.payment_id,
                p.payment_quantity,
                p.payment_interest,
                p.payment_status
            FROM 
                payments p`);
        return rows;
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw error;
    }
};

module.exports = {
    getAllPaymentsFromDB
}