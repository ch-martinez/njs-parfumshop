const checkoutView = async (req, res) => {
    const data = {
        title: "Checkout",
    }
    res.render('pages/checkout/checkout', { layout: 'layouts/mainLayout', data })
}

module.exports = {
    checkoutView
}