const getProducts = (req, res, next) => {
    res.status(200).send({
        status: true,
        message: 'this is my all product database'
    })
}
module.exports = {
    getProducts
}