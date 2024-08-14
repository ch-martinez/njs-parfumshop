const { pool } = require('../config/parfumshopBD')

const getAllProvidersFromDB = async () => {
    const connection = await pool.getConnection()
    try {
        const [rows] = await connection.query(`
            SELECT 
                p.provider_id,
                p.provider_name,
                p.provider_tel,
                p.provider_email,
                p.provider_status
            FROM 
                providers p
            WHERE
                p.provider_deleted = 0
            ORDER BY provider_name ASC`);
        return rows;
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        throw error;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
};

const getProviderFromDB = async (provider_id) => {
    const connection = await pool.getConnection()
    try {
        const [[rows]] = await connection.query(`
            SELECT 
                p.*
            FROM 
                providers p
            WHERE
                p.provider_id = ? AND p.provider_deleted = 0`, [provider_id]);
        return rows;
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        throw error;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const newProviderInDB = async (provider) => {
    const connection = await pool.getConnection()

    const query = `
        INSERT INTO 
            providers (
                provider_name,
                provider_email,
                provider_tel,
                provider_address,
                provider_status,
                provider_obs,
                provider_detail
            )
        VALUES (?,?,?,?,?,?,?)`
    const params = [
        provider.provider_name,
        provider.provider_email,
        provider.provider_tel,
        provider.provider_address,
        provider.provider_status,
        provider.provider_obs,
        provider.provider_detail
    ]

    try {
        const [insertResult] = await connection.query(query, params);
        return {id: insertResult.insertId};
    } catch (error) {
        console.error('Error al añadir proveedor:', error);
        throw error;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const updateProviderInDB = async (id, provider) => {
    const connection = await pool.getConnection()

    const query = `
        UPDATE providers
        SET 
            provider_name = ?,
            provider_email = ?,
            provider_tel = ?,
            provider_address = ?,
            provider_status = ?,
            provider_obs = ?,
            provider_detail = ?
        WHERE provider_id = ?;`

    const params = [
        provider.provider_name,
        provider.provider_email,
        provider.provider_tel,
        provider.provider_address,
        provider.provider_status,
        provider.provider_obs,
        provider.provider_detail,
        id
    ]

    try {
        await connection.query(query, params);
        return true;
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        return false;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const logicDeleteProviderInDB = async (id) => {
    const connection = await pool.getConnection()
    try {
        const query = `
            UPDATE providers
            SET 
                provider_deleted = 1
            WHERE provider_id = ?;`

        await connection.query(query, id);

        return true;
    } catch (error) {
        await connection.rollback();
        console.error('Error al eliminar el brand y sus productos:', error);
        return false;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const updateProviderStatusInDB = async (id, status) => {
    const connection = await pool.getConnection()
    try {
        await connection.query("UPDATE providers SET provider_status = ? WHERE provider_id = ?", [status, id])
        return true
    } catch (error) {
        console.log('Error al actualizar el estado: ', error)
        return false
    } finally {
        if (connection) await connection.release()
    }
}

module.exports = {
    getAllProvidersFromDB,
    getProviderFromDB,
    newProviderInDB,
    updateProviderInDB,
    logicDeleteProviderInDB,
    updateProviderStatusInDB
}