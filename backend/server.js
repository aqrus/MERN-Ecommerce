const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//setting up config file
dotenv.config({
    path: 'backend/config/config.env'
});
//connecting database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})
app.use(function (err, req, res, next) {
    res.status(500).send({
        message: err.message
    })
})