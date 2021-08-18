const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = asyncHandler( async (req, res, next) => {
    
    const { token } = req.cookies;
    if(!token) {
        res.status(401).send({
            message: "Login first access this resource."
        });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = await User.findById(decode.id);
    next();
    
})
exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            res.status(403).send({
                message: `Role (${req.user.role}) is not allow access`
            })
        }
        next();
    }

}