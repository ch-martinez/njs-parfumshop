const { pool } = require('./parfumshopBD')

function generarNumeroRandom(n) { return Math.floor(Math.random() * n) + 1;}

const generatorProduct = async (pid, qty) => {

    const formarter = (p, qty) => {
        function aplicarDescuento(precio, porcentajeDescuento) {
            return precio - (precio * porcentajeDescuento / 100);
        }
        const discount = aplicarDescuento(p.product_price_sell, p.product_discount) 
        return {
            op_brand: p.brand_name ,
            op_sku: p.product_sku ,
            op_name: p.product_name ,
            op_ml: p.product_ml ,
            op_gender: p.product_gender ,
            op_price: p.product_price_sell ,
            op_price_discount: discount,
            op_qty: qty ,
            op_total: discount * qty ,
        }
    }

    const connection = await pool.getConnection()
    const query = "SELECT p.*, b.brand_name FROM products p LEFT JOIN brands b ON b.brand_id = p.brand_id WHERE p.product_id = ?"

    try {
        const [[resp]] = await connection.query(query, pid)
        return formarter(resp, qty)
    } catch (error) {
        console.log("== ERROR generatorProduct: ", error)
    } finally {
        connection && await connection.release()
    }
}

const updaterOrder = async (oid) => {
    const connection = await pool.getConnection()
    const query = `
        UPDATE orders o
        JOIN (
            SELECT 
                order_id, 
                SUM(op_total) AS total_price, 
                SUM(op_qty) AS total_products
            FROM order_product_list
            WHERE order_id = ?
            GROUP BY order_id
        ) os ON o.order_id = os.order_id
        SET
            o.order_total_price = os.total_price,
            o.order_total_products = os.total_products
        WHERE o.order_id = ?;`

    try {
        await connection.query(query, [oid, oid])
        return true
    } catch (error) {
        console.log("== ERROR updaterOrder: ", error)
        return false
    } finally {
        connection && await connection.release()
    }
}

const generator = async (cid) => {
    const connection = await pool.getConnection()

    const query_o = `
        INSERT INTO orders (
            customer_id,
            order_ticket,
            order_total_price,
            order_total_products
        )
        VALUES (?,?,?,?)`
    const params_o = [cid, "XXXX", 0, 0]

    // order_status
    const query_ost = "INSERT INTO order_status (order_id) VALUES (?)"

    // order_customer
    const query_oc = `
        INSERT INTO order_customer (
            order_id,
            oc_name,
            oc_lastname,
            oc_dni,
            oc_tel,
            oc_email)
        SELECT
            ?,
            c.customer_name,
            c.customer_lastname,
            c.customer_dni,
            c.customer_tel,
            c.customer_email
        FROM customers c
        WHERE c.customer_id = ?`

    // order_shipping
    const query_os = `
        INSERT INTO order_shipping (
            order_id,
            os_street ,
            os_number ,
            os_floor ,
            os_city,
            os_state ,
            os_zip ,
            os_obs)
        SELECT
            ?,
            ca.caddress_street,
            ca.caddress_number,
            ca.caddress_floor,
            ca.caddress_city,
            ca.caddress_state,
            ca.caddress_zip,
            ca.caddress_obs
        FROM customers_address ca
        WHERE ca.customer_id = ?
        LIMIT 1`

    // order_product_list
    const query_op = `
        INSERT INTO order_product_list (
            order_id,
            op_brand,
            op_sku,
            op_name,
            op_ml,
            op_gender,
            op_price,
            op_price_discount,
            op_qty,
            op_total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    try {
        //Iniciar transacción
        await connection.beginTransaction();

        const [insertResult] = await connection.query(query_o, params_o)
        const oid = insertResult.insertId

        const params_oc = [oid,cid]
        const params_os = [oid,cid]

        await connection.query(query_ost, oid)
        console.log('* order_status OK')

        await connection.query(query_oc, params_oc)
        console.log('* order_customer OK')

        await connection.query(query_os, params_os)
        console.log('* order_shipping OK')

        const n_products = generarNumeroRandom(10)
        for (let index = 1; index <= n_products; index++) {
            const pid = generarNumeroRandom(429)
            const qty = generarNumeroRandom(10)
            const p = await generatorProduct(pid,qty)
            const params_op = [oid, p.op_brand, p.op_sku, p.op_name, p.op_ml, p.op_gender, p.op_price, p.op_price_discount, p.op_qty, p.op_total]
            await connection.query(query_op, params_op)
        }
        console.log('* order_product OK')

        //Finalizar transacción
        await connection.commit();

        await updaterOrder(oid)
        console.log('FINALIZADO CON EXITO')
    } catch (error) {
        connection.rollback()
        console.log("== ERROR: ", error)
    } finally {
        connection && await connection.release()
    }
}

// Iniciar

generator(1)


/* TRUNCATE TABLE order_customer;
TRUNCATE TABLE order_product_list;
TRUNCATE TABLE order_shipping;
TRUNCATE TABLE order_status;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE orders;
SET FOREIGN_KEY_CHECKS = 1; */