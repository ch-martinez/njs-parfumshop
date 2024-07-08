const { pool } = require('../config/parfumshopBD')

const getAllPaymentsFromDB = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                pm.pm_id,
                pm.pm_sku,
                pm.pm_name,
                pm.pm_description,
                pm.pm_status
            FROM 
                payment_methods pm`);
        return rows;
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw error;
    }
};

module.exports = {
    getAllPaymentsFromDB
}