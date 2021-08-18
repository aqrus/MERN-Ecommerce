const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Plese enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 character']
    },
    price: {
        type: Number,
        required: [true, 'Plese enter product price'],
        maxLength: [5, 'Product price cannot exceed 5 character'],
        default: 0.00
    },
    description: {
        type: String,
        required: [true, 'Plese enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'please select a category for product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Plese enter product seller']
    },
    stock: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: true
    },
    reviews: [
        {
            name: { type: String },
            rating: {type: Number },
            comment: {type: String}
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, 
{
    timestamps: true
});
module.exports = mongoose.model('Product', productSchema)