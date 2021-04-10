//importing ( in package.json - added type: module - which allows us to use ES6 feture ( instead of const module = require('module')))
import express from 'express';
import mongoose from 'mongoose';

//app config
const app = express()
const port = process.env.PORT || 9000

// middleware

// DB config

const connection_url = 'mongodb+srv://admin:1Mip2rbJGWSMAUro@cluster0.883rx.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    userCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// api routes
app.get('/', (req,res) => res.status(200).send('hello world'))

// listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))