module.exports = (app) => {

    app.use('/', require('./home.r'));

    app.use('/payment', require('./payment.r'));

    app.use('/account', require('./account.r'));

    app.use('/api', require('./api.r'));
}