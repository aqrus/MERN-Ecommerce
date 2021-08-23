const express = require('express');
const cookiesParser = require('cookie-parser');
const products = require('./routers/productRouters');
const auth = require('./routers/authRouters');
const order = require('./routers/orderRouters');
const expressFileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser())
app.use(expressFileUpload())

app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/products', products);
app.use('/api/v1/auth', auth)
app.use('/api/v1/order', order)

module.exports = app;