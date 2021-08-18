const sendToken = (user, statusCode, res) => {

    const token = user.getJWToken();

    const options = {
        expires: new Date ( Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 *60 * 60 * 1000),
        httpOnly: true
    } 

    res.status(statusCode).cookie('token', token, options).send({
        success: true,
        user,
        token
    })
}

module.exports = sendToken;