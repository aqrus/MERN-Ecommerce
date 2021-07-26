const express = require('express');
app = express();

const products = require('./routers/productRouters');

app.use('/api/v1', products);
module.exports = app;