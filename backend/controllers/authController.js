const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');
const path = require('path');

const registerUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send({
            message: 'No files were uploaded'
        });
    }
    
    if( req.files ) {

        const file = req.files.avatar;
        var fileName = file.name;
        var uploadPath = path.parse(__dirname).dir+'/uploads/image/' + fileName;

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: fileName,
                url: uploadPath
            }
        })
        if(user){
            file.mv( uploadPath, (err) => {
                if (err)
                    return res.status(500).send(err)
            })
            sendToken(user, 200, res)
        }
    }
})

//Forgot password => api/v1/auth/password/forgot
const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if(!user) {
        res.status(401).send({
            message: 'User not found with this email'
        });
    }

    //Get reset Token
    const resetToken = user.getResetPassword();

    await user.save({validateBeforeSave: false});

    //create url password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is as folow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`

    try {

        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        });
        res.status(200).send({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});
        res.status(500).send({
            message: error.message
        })
    }
})

//Reset password Token => api/v1/auth/password/reset/{Token}
const resetPassword = asyncHandler(async (req, res) => {

    const { password, confirmPassword } = req.body;

    //Hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    
    if(!user) {
        res.status(400).send({
            message: 'Password reset token or invalid or has been expire'
        })
    }

    if( password !== confirmPassword) {
        res.status(400).send({
            message: 'password does not match'
        })
    }

    //setup new password
    user.password = confirmPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res)
})

const loginUser = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).send({
            message: "Plese enter email & password"
        });
    }
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        res.status(404).send({
            message: "invalid email"
        })
        next()
    }

    const isComparePassword = await user.comparePassword(password);
    if(!isComparePassword) {
        res.status(404).send({
            message: 'invalid password'
        });
    }else {
        sendToken(user, 200, res)
    }
})

//Get curently user detail => api/v1/auth/me
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.send({
        success: true,
        user
    })
})

//Update/change password user => api/v1/auth/password/update
const updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        res.status(404).send({
            message: 'password is not match'
        })
    } else {
        user.password = req.body.password;
        await user.save();
        sendToken(user, 200, res)
    }
})

// Update user profile  => api/v1/auth/me/update
const updateUserProfile = asyncHandler(async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    if( req.files ) {

        const file = req.files.avatar;
        var fileName = file.name;
        var uploadPath = path.parse(__dirname).dir+'/uploads/image/' + fileName;

        file.mv( uploadPath, (err) => {
            if (err)
                return res.status(500).send(err)
        })
        
        newUserData.avatar = {
            public_id: file.name,
            url: path.parse(__dirname).dir+'/uploads/image/' + fileName
        }
    }

    user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).send({
        success: true
    })

})

//Get All users => api/v1/auth/admin/users
const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find();
    res.status(200).send({
        success: true,
        users
    })

})

// user details => api/v1/auth/admin/user/:id
const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);
    if(!user) {
        res.status(404).send({
            message: `User does not found with id : ${req.params.id}`
        });
    }
    res.status(200).send({
        success: true,
        user
    })
})

// Update user profile in admin  => api/v1/auth/admin/user/:id
const updateUser = asyncHandler(async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    //update avartar: after

    user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).send({
        success: true
    })

})

//delete user in admin => api/v1/auth/admin/user/:id
const deleteUser = asyncHandler(async (req, res) => {

    user = await User.findById(req.params.id);

    if(!user) {
        res.status(404).send({
            message: `User does not found with id : ${req.params.id}`
        });
    }

    //remove avatar

    await user.remove();
    res.status(200).send({
        success: true
    })

})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(201).send({
        success: true,
        message: "logout"
    })
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateUserProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}