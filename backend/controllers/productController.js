const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

const getAllProducts = asyncHandler(async (req, res, next) => {

    const { min, max, rating } = req.query;

    const pageSize = req.query.pageSize || 8;
    const pageNumber = req.query.pageNumber || 1;
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
    const filterPrice = min && max ? { price: { '$gte': min, '$lt': max } } : {};
    const ratings = { ratings: { '$gte': rating } }
    
    const { docs, totalDocs, page, limit, totalPages } = await Product.paginate(
        {   
            name: { $regex: new RegExp(keyword), $options: "i" },
            category: { $regex: new RegExp(category), $options: "i"  },
            ...filterPrice,
            ...ratings
        }, 
        { 
            limit: pageSize , page: pageNumber,
            sort: ({ ratings: -1 })
        },
    );

    res.status(200).send(
        {
            products: docs,
            pageCount: totalDocs,
            page: page,
            limit: limit,
            totalPages: totalPages
        });

});

// All productAdmin => 
const getAdminProducts = asyncHandler(async (req, res) => {
    
    const products = await Product.find();

    res.status(200).send({
            products: products,
        });

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
    req.body.user = req.user.id;
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

//Create new reviews => api/v1/product/review
const createProductReviews = asyncHandler(async (req, res) => {
    
    const { rating , comment, productId } = req.body;
    
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,

    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString() )

    if( isReviewed ) {
        
        product.reviews.forEach(review => {
            if( review.user.toString() === req.user._id.toString() ){
                review.rating = rating;
                review.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.numOfReviews !== 0 
                        ? product.reviews.reduce((rating, item) => rating + item.rating, 0) / product.numOfReviews
                        : product.numOfReviews;
    await product.save({ validateBeforeSave: false });

    res.status(200).send({
        success: true,
        product
    })

})

//Get all reviews of product => api/v1/product/review/:id
const getProductReviews = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    
    if(!product) {
        res.status(404).send({
            message: "Product not found with id"
        })
        return ;
    }
    
    res.status(200).send({
        reviews: product.reviews
    })

});

//Delete reviews of product => api/v1/product/review?productId=productId&id=id
const deleteProductReview = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
    
    if(!product) {
        res.status(404).send({
            message: "Product not found with id"
        })
        next()
    }

    const reviews = product.reviews.filter(review => review._id.toString() !==  req.query.id.toString() )
    const numOfReviews = reviews.length;
    const ratings = numOfReviews !==0 ? reviews.reduce((rating, item) => rating + item.rating, 0) / numOfReviews : numOfReviews;
    
    await Product.findByIdAndUpdate( req.query.productId, {
        reviews,
        numOfReviews,
        ratings: Number(ratings)
    },
    {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).send({
        product
    })

});

module.exports = {
    seedProduct,
    getAllProducts,
    getProduct,
    newProduct,
    updateProduct,
    deleteProduct,
    createProductReviews,
    getProductReviews,
    deleteProductReview,
    getAdminProducts
}