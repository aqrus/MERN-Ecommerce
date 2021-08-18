const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

const newOrder = asyncHandler(async (req, res) => {
    
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).send({
        success: true,
        order
    })
})

//get single order => api/v1/order/:id
const getSingleOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order) {
        res.status(404).send({
            message: "No order found with id this"
        })
    }

    res.status(200).send({
        success: true,
        order
    })
})

//get my order => api/v1/order/me
const myOrder = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user.id });

    res.status(200).send({
        success: true,
        orders
    })
})

//get all order => api/v1/order/admin/orders
const allOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find();

    let totalAmount = orders.reduce((total, order) => total + order.totalPrice, 0)

    res.status(200).send({
        success: true,
        orders,
        totalAmount
    })
})

//Update order => api/v1/order/admin/order/:id
const updateOrders = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if(!order) {
        res.status(404).send({
            message: "Order not found with this id"
        })
        next();
    }
    if(order.orderStatus === "Delivered") {
        res.status(400).send("You have already Delivered this order");
        next();
    }

    order.orderItems.forEach( async (item) => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).send({
        success: true,
        order
    })
})
async function updateStock(id, quantity) {
    
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}

//Delete order => api/v1/order/admin/order/:id
const deleteOrders = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if(!order) {
        res.status(404).send({
            message: "Order not found with this id"
        })
        next();
    }
    await order.remove();

    res.status(200).send({
        success: true,
    })
})

module.exports = {
    newOrder,
    getSingleOrder,
    myOrder,
    allOrders,
    updateOrders,
    deleteOrders
}