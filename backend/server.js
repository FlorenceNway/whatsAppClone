//importing ( in package.json - added type: module - which allows us to use ES6 feture ( instead of const module = require('module')))
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';

//app config
const app = express()
const port = process.env.PORT || 9000

// middleware
app.use(express.json())

// DB config
const connection_url = 'mongodb+srv://admin:nbhnPNApPVPOAkw4@cluster0.883rx.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    userCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// api routes
app.get('/', (req,res) => res.status(200).send('hello world'))

app.post('/messages/new',(req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage,(err,data) => {
        if(err) {
            res.status(500).send(err)
        }else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})


// listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))