const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')

// Configuracion para la lectura de formularios y archivos json
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Se define la carpeta 'public' para archivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')))

// Configuracion dotenv
const dotenv = require('dotenv')
dotenv.config()

// Config. de template engine: EJS
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'src/views'))

// Config. de motor de plantillas
const expressEjsLayouts = require('express-ejs-layouts')
app.use(expressEjsLayouts)

// Imports de rutas
const mainRouter = require("./src/routes/mainRouter.js")
const productsRouter = require("./src/routes/productsRouter.js")
const brandsRouter = require("./src/routes/brandsRouter.js")
const providersRouter = require("./src/routes/providersRouter.js")
const couponsRouter = require("./src/routes/couponsRouter.js")

// Rutas
app.use('/', mainRouter);
app.use('/product', productsRouter);
app.use('/brand', brandsRouter);
app.use('/provider', providersRouter);
app.use('/coupon', couponsRouter)

app.use('', (req, res) => { res.render('pages/notfoundPage', { layout: 'layouts/mainLayout', data: { title: '404 - Pagina no encontrada' } }) })

// Servidor
app.listen(PORT, () => {
    console.log(`>>> Server: http://localhost:${PORT}`)
});