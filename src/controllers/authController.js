const loginView = (req, res) => {
    let data = { title: 'Iniciar sesión' }
    res.render('pages/auth/loginPage', { layout: 'layouts/mainLayout', data })
}

const recoveryView = (req, res) => {
    let data = { title: 'Recuperar contraseña' }
    res.render('pages/auth/recoveryPage', { layout: 'layouts/mainLayout', data })
}

const registerView = (req, res) => {
    let data = { title: 'Registrarse' }
    res.render('pages/auth/registerPage', { layout: 'layouts/mainLayout', data })
}

module.exports = {
    loginView,
    recoveryView,
    registerView
}