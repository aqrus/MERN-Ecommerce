const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).send(products)
});
const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.status(200).send(product);
        next();
    }
    res.status(404).send({
        succes: false,
        message: "Product Not Faund"
    })
});
const newProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.send({
        succes: true,
        product
    })
});
const updateProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).send({
            succes: false,
            message: "Product Not Faund"
        });
    } else {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.send({
            succes: true,
            product
        });
    }
    
})
const deleteProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).send({
            succes: false,
            message: "Product Not Faund"
        });
    } else {
        await product.remove();
        res.send({
            succes: true,
            message: "Product is delete"
        });
    }
    
})
const seedProduct = asyncHandler(async (req, res) => {
    const product = await Product.insertMany(req.body);
    res.send({
        succes: true,
    })
});
module.exports = {
    seedProduct,
    getAllProducts,
    getProduct,
    newProduct,
    updateProduct,
    deleteProduct
}