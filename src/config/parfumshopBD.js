const { createPool } = require('mysql2/promise')
const { config } = require('dotenv')
config()

/* const pool = createPool({
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    database: process.env.DB_DATABASE ?? 'parfumshop',
    password: process.env.DB_PASSWORD ?? '',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
}) */

const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'parfumshop',
    password: '',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
})

pool.getConnection()
    .then(connection => {
        console.log('>>> DB: Conexion OK')
        connection.release()
    })
    .catch(err => {
        console.log(`>>> DB: Error al obtener la conexion, ${err}`)
    })

module.exports = {pool}