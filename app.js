const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')

//Configuracion para la lectura de formularios y archivos json
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Se define la carpeta 'public' para archivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')))

// Configuracion dotenv
const dotenv = require('dotenv')
dotenv.config()

//Config. de template engine: EJS
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'src/views'))

//Config. de motor de plantillas
const expressEjsLayouts = require('express-ejs-layouts')
app.use(expressEjsLayouts)

//Imports de rutas
const mainRouter = require("./src/routes/mainRouter.js")
const shopRouter = require("./src/routes/shopRouter.js")
const cartRouter = require("./src/routes/cartRouter.js")
const checkoutRouter = require("./src/routes/checkoutRouter.js")
const authRouter = require("./src/routes/authRouter.js")
const userRouter = require("./src/routes/userRouter.js")
const adminRouter = require("./src/routes/adminRouter.js")

//Rutas
app.use('/', mainRouter);
app.use('/shop', shopRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use('', (req, res) => { res.render('pages/main/notfoundPage', { layout: 'layouts/mainLayout', data: { title: '404 - Pagina no encontrada' } }) })

//Servidor
app.listen(PORT, () => {
    console.log(`>>> Server: http://localhost:${PORT}`)
});