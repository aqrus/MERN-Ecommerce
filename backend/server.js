const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//setting up config file
dotenv.config({
    path: 'backend/config/config.env'
});
//connecting database
connectDatabase();

app.get('/', (req, res) => {
    res.send('server is running');
})
app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})