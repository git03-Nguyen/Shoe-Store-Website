module.exports = (app) => {

    app.use('/', require('./home.r'));

    app.use('/payment', require('./payment.r'));
}