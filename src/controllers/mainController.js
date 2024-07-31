const mainView = (req, res) => {
    let data = {
        title: 'Panel administración'
    };
    res.render('pages/mainPage', { layout: 'layouts/mainLayout', data });   
};

module.exports = {
    mainView,
};