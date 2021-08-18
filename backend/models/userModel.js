const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        maxLength:[30, 'Your name cannot exceed 30 character']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Plese validate email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamp: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.getJWToken = function() {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRECT,
        { expiresIn: process.env.JWT_EXPIRESTIME }
    );
}

//generate password reset Token
userSchema.methods.getResetPassword = function() {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //Hash and set resetPasswordExpire
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema)
