const { pool } = require('../config/parfumshopBD')

// Funcion auxiliar: Genera la consulta SQL según los parametros recibidos
const queryGenerator = (queryIn, filters) => {
    let query = queryIn
    let params = []

    if (filters.status) {
        query += ` AND p.product_status = ?`
        params.push(filters.status)
    }

    if (filters.stock) {
        query += ` AND p.product_stock < ?`
        params.push(filters.stock)
    }

    if (filters.gender) {
        query += ` AND p.product_gender = ?`
        params.push(filters.gender)
    }

    if (filters.product_type) {
        query += ` AND p.product_type = ?`
        params.push(filters.product_type)
    }

    if (filters.price_list_min) {
        query += ` AND p.product_price_list >= ?`
        params.push(filters.price_list_min)
    }

    if (filters.price_list_max) {
        query += ` AND p.product_price_list <= ?`
        params.push(filters.price_list_max)
    }

    if (filters.price_sell_min) {
        query += ` AND p.product_price_sell >= ?`
        params.push(filters.price_sell_min)
    }

    if (filters.price_sell_max) {
        query += ` AND p.product_price_sell <= ?`
        params.push(filters.price_sell_max)
    }

    if (filters.discount) {
        query += ` AND p.product_discount <= ?`
        params.push(filters.discount)
    }

    if (filters.payment) {
        query += ` AND p.payment_id = ?`
        params.push(filters.payment)
    }

    if (filters.new) {
        query += ` AND pf.pf_new = ?`
        params.push(filters.new == 'on' ? true : false)
    }

    if (filters.featured) {
        query += ` AND pf.pf_featured = ?`
        params.push(filters.featured == 'on' ? true : false)
    }

    if (filters.topSeller) {
        query += ` AND pf.pf_topseller = ?`
        params.push(filters.topSeller == 'on' ? true : false)
    }

    if (filters.promoted) {
        query += ` AND pf.pf_promoted = ?`
        params.push(filters.promoted == 'on' ? true : false)
    }

    if (filters.brand_id) {
        query += ` AND p.brand_id = ?`
        params.push(filters.brand_id)
    }

    query += `;`

    return { query, params }
}

const getAllProductsFromDB = async (filters) => {
    const connection = await pool.getConnection()

    const queryInitial = `
        SELECT 
            p.*,
            b.brand_name,
            pf.pf_new,
            pf.pf_featured,
            pf.pf_topseller,
            pf.pf_promoted
        FROM 
            products p
        INNER JOIN brands b ON b.brand_id = p.brand_id
        INNER JOIN products_flags pf ON p.product_id = pf.product_id
        WHERE p.product_deleted = 0`

    const { query, params } = queryGenerator(queryInitial, filters)

    try {
        const [rows] = await connection.query(query, params);
        return rows;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
};

const getProductFromDB = async (id) => {
    const connection = await pool.getConnection()
    try {
        const [[rows]] = await connection.query(`
            SELECT 
                p.*,
                py.payment_quantity,
                b.brand_name,
                pr.provider_name,
                pf.pf_new,
                pf.pf_featured,
                pf.pf_topseller,
                pf.pf_promoted
            FROM 
                products p
            INNER JOIN payments py ON p.payment_id = py.payment_id 
            INNER JOIN brands b ON p.brand_id = b.brand_id 
            INNER JOIN providers pr ON p.provider_id = pr.provider_id
            INNER JOIN products_flags pf ON p.product_id = pf.product_id
            WHERE p.product_id = ? AND p.product_deleted = 0`, id);
        return rows;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const newProductInDB = async (data) => {
    const connection = await pool.getConnection()
    try {
        //Iniciar transacción
        await connection.beginTransaction();

        //Inserta el producto
        const queryProduct = `
        INSERT INTO products
        (
            product_name,
            product_description,
            product_ml,
            product_family,
            product_gender,
            product_type,
            product_price_list,
            product_price_sell,
            product_discount,
            payment_id,
            product_sku,
            product_stock,
            product_status,
            brand_id,
            provider_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const paramsProduct = [
            data.product_name,
            data.product_description,
            data.product_ml,
            data.product_family,
            data.product_gender,
            data.product_type,
            data.product_price_list,
            data.product_price_sell,
            data.product_discount,
            data.payment_id,
            data.product_sku,
            data.product_stock,
            data.product_status,
            data.brand_id,
            data.provider_id];

        const [insertProductResult] = await connection.query(queryProduct, paramsProduct);

        //Obtener el id del producto
        const lastProductId = insertProductResult.insertId;

        //Inserta los flags del producto
        const queryFlags = `
        INSERT INTO products_flags
            (product_id, pf_new, pf_featured, pf_topseller, pf_promoted)
        VALUES (?, ?, ?, ?, ?)`;

        const paramsFlags = [
            lastProductId,
            data.product_flags.new,
            data.product_flags.featured,
            data.product_flags.topSeller,
            data.product_flags.promoted];

        await connection.query(queryFlags, paramsFlags);
        //Finalizar transacción
        await connection.commit();

        return { product_id: lastProductId };
    } catch (error) {
        await connection.rollback();
        console.error('Error al actualizar el producto:', error);
        return false;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const updateProductInDB = async (id, data) => {
    const connection = await pool.getConnection()
    const queryProduct = `
        UPDATE products
        SET 
            product_name = ?,
            product_description = ?,
            product_ml = ?,
            product_family = ?,
            product_gender = ?,
            product_type = ?,
            product_price_list = ?,
            product_price_sell = ?,
            product_discount = ?,
            payment_id = ?,
            product_sku = ?,
            product_stock = ?,
            product_status = ?,
            brand_id = ?,
            provider_id = ?
        WHERE product_id = ? AND product_deleted = 0;`;

    const paramsProduct = [
        data.product_name,
        data.product_description,
        data.product_ml,
        data.product_family,
        data.product_gender,
        data.product_type,
        data.product_price_list,
        data.product_price_sell,
        data.product_discount,
        data.payment_id,
        data.product_sku,
        data.product_stock,
        data.product_status,
        data.brand_id,
        data.provider_id,
        id];

    const queryFlags = `
        UPDATE products_flags
        SET 
            pf_new = ?,
            pf_featured = ?,
            pf_topseller = ?,
            pf_promoted = ?
        WHERE product_id = ?;`;

    const paramsFlags = [
        data.product_flags.new,
        data.product_flags.featured,
        data.product_flags.topSeller,
        data.product_flags.promoted,
        id];

    try {
        await connection.query(queryProduct, paramsProduct);
        await connection.query(queryFlags, paramsFlags);
        return true;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return false;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const logicDeleteProductInDB = async (id) => {
    const connection = await pool.getConnection()
    try {
        await connection.query(`
            UPDATE products
            SET 
                product_deleted = 1
            WHERE product_id = ?;`, id);
        return true;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return false;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

const updateProductStatusInDB = async (id, status) => {
    const connection = await pool.getConnection()
    try {
        await connection.query(`
            UPDATE products
            SET 
                product_status = ?
            WHERE product_id = ?;`, [status, id]);
        return true;
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
        return false;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}

/* Contador segun filtros indicados */
const counterProductsInDB = async (filters) => {
    const connection = await pool.getConnection()
    const queryInitial = `
        SELECT 
            COUNT(*) AS total
        FROM 
            products p
        WHERE product_deleted = 0`

    const { query, params } = queryGenerator(queryInitial,filters)

    try {
        const [[rows]] = await connection.query(query, params);
        return rows.total;
    } catch (error) {
        console.error('Error al obtener el total de productos:', error);
        throw error;
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
}


module.exports = {
    getAllProductsFromDB,
    getProductFromDB,
    newProductInDB,
    updateProductInDB,
    logicDeleteProductInDB,
    updateProductStatusInDB,

    counterProductsInDB
}