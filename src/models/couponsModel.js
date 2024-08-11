const { pool } = require('../config/parfumshopBD')

const getAllCouponsFromDB = async () => {
    const connection = await pool.getConnection()

    const query = "SELECT * FROM coupons WHERE coupon_deleted = 0"

    try {
        const [resp] = await connection.query(query)
        return resp
    } catch (error) {
        console.log('Error al obtener cupones: ', error)
        throw error;
    } finally {
        if (connection) await connection.release()
    }
}

const getCouponFromDB = async (id) => {
    const connection = await pool.getConnection()
    const query = "SELECT * FROM coupons WHERE coupon_id = ? AND coupon_deleted = 0"

    try {
        const [[resp]] = await connection.query(query, id)
        return resp
    } catch (error) {
        console.log('Error al obtener el cupon: ', error)
        return false
    } finally {
        if (connection) await connection.release()
    }
}

const insertCouponInDB = async (data) => {
    const connection = await pool.getConnection()
    const query = `
        INSERT INTO coupons (
            coupon_title,
            coupon_description,
            coupon_obs,
            coupon_code,
            coupon_discount,
            coupon_start,
            coupon_end,
            coupon_status,
            coupon_statusCode
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const params = [
        data.coupon_title,
        data.coupon_description,
        data.coupon_obs,
        data.coupon_code,
        data.coupon_discount,
        data.coupon_start,
        data.coupon_end,
        data.coupon_status,
        0
    ]

    try {

        const [insertResponse] = await connection.query(query, params)
        const couponId = insertResponse.insertId
        return {coupon_id: couponId}

    } catch (error) {
        console.log('ERROR al insertar cupon ',error)
        return false
    } finally {
        if (connection) await connection.release()
    }
}

const updateCouponInDB = async (id, data) => {
    const connection = await pool.getConnection()
    const query = `
        UPDATE coupons
        SET
            coupon_title = ?,
            coupon_description = ?,
            coupon_obs = ?,
            coupon_code = ?,
            coupon_discount = ?,

            coupon_statusCode = ?,
            coupon_status = ?
        WHERE
            coupon_id = ?
        `
    const params = [
        data.coupon_title,
        data.coupon_description,
        data.coupon_obs,
        data.coupon_code,
        data.coupon_discount,
        data.coupon_statusCode,
        data.coupon_status,
        id
    ]
    try {
        await connection.query(query, params)
        return true
    } catch (error) {
        console.log('Error al actualizar el cupon: ', error)
        return false
    } finally {
        if (connection) await connection.release()
    }
}

const logicDeleteCouponInDb = async (id) => {
    const connection = await pool.getConnection()
    try {
        await connection.query("UPDATE coupons SET coupon_deleted = 1 WHERE coupon_id = ?", id)
        return true
    } catch (error) {
        console.log('Error al eliminar el cupon: ', error)
        return false
    } finally {
        if (connection) await connection.release()
    }
}

const updateStatusInDB = async (id, status) => {
    const connection = await pool.getConnection()
    const query = 'UPDATE coupons SET coupon_status = ? WHERE coupon_id = ? AND coupon_deleted = 0'
    const params = [status, id]
    try {
        await connection.query(query, params)
        return true
    } catch (error) {
        console.log('Error al actualizar el cupon: ', error)
        return false
    } finally {
        if (connection) await connection.release()
    }
}

module.exports = {
    getAllCouponsFromDB,
    getCouponFromDB,
    insertCouponInDB,
    updateCouponInDB,
    logicDeleteCouponInDb,
    updateStatusInDB
}