const { pool } = require('../config/parfumshopBD')

const getAllBrandsFromDB = async () => {
    const connection = await pool.getConnection()
    const query = `
        SELECT 
            b.brand_id,
            b.brand_name,
            b.brand_status
        FROM 
            brands b
        WHERE b.brand_deleted = 0
        ORDER BY brand_name ASC`;
    try {
        const [rows] = await connection.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener marcas:', error);
        throw error;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const getBrandFromDB = async (brand_id) => {
    try {
        const [[rows]] = await pool.query(`
            SELECT 
                b.*
            FROM 
                brands b
            WHERE
                b.brand_id = ?`, [brand_id]);
        return rows;
    } catch (error) {
        console.error('Error al obtener marcas:', error);
        throw error;
    }
}

const newBrandInDB = async (brand) => {
    const connection = await pool.getConnection()

    const query = `
            INSERT INTO brands (brand_name,brand_status)
            VALUES (?,?)`
    const params = [brand.brand_name,brand.brand_status]

    try {
        const [insertResult] = await connection.query(query, params);
        return {id: insertResult.insertId};
    } catch (error) {
        console.error('Error al obtener marcas:', error);
        throw error;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const updateBrandInDB = async (brand) => {
    const connection = await pool.getConnection()

    const query = `
            UPDATE brands
            SET 
                brand_name = ?
            WHERE brand_id = ?;`
    const params = [brand.brand_name, brand.brand_id]

    try {
        await connection.query(query, params);
        return true;
    } catch (error) {
        await connection.rollback();
        console.error('Error al actualizar el estado:', error);
        return false;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const logicDeleteBrandInDB = async (id) => {
    const connection = await pool.getConnection()
    try {
        //Iniciar transacción
        await connection.beginTransaction();

        const queryBrand = `
            UPDATE brands
            SET 
                brand_deleted = 1
            WHERE brand_id = ?;`

        await connection.query(queryBrand, id);

        const queryProducts = `
            UPDATE products
            SET 
                product_deleted = 1
            WHERE brand_id = ?;`

        await connection.query(queryProducts, id);

        //Finalizar transacción
        await connection.commit();
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

const updateBrandStatusInDB = async (id, status) => {
    const connection = await pool.getConnection()
    const query = `
        UPDATE brands
        SET 
            brand_status = ?
        WHERE brand_id = ?;`

    const params = [status, id]

    const queryProduct = `
        UPDATE products
        SET 
            product_status = ?
        WHERE brand_id = ?;`

    try {
        //Iniciar transacción
        await connection.beginTransaction();

        await connection.query(query, params);
        await connection.query(queryProduct, params);

        //Finalizar transacción
        await connection.commit();
        return true;
    } catch (error) {
        await connection.rollback();
        console.error('Error al actualizar el estado:', error);
        return false;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

module.exports = {
    getAllBrandsFromDB,
    getBrandFromDB,
    newBrandInDB,
    updateBrandInDB,
    logicDeleteBrandInDB,
    updateBrandStatusInDB
}