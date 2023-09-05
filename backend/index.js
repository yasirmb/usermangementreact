const express = require('express');
const cors = require('cors')
const logger = require('morgan');
require('dotenv').config();
const connectDB = require('./db')
const userRouter=require('./routes/user');
const adminRouter=require('./routes/admin');
const app = express();



app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

app.use('/',userRouter);
app.use('/admin',adminRouter);


app.listen(3000, () => {
  console.log('Server started on port 3000');
});

connectDB()

module.exports = app;