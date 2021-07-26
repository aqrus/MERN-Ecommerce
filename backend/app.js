const express = require('express');
const products = require('./routers/productRouters');

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/products', products);
module.exports = app;