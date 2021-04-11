//importing ( in package.json - added type: module - which allows us to use ES6 feture ( instead of const module = require('module')))
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';

//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1186361",
    key: "fd4103a6438ae7bf1733",
    secret: "d804685ffa047f48c826",
    cluster: "eu",
    useTLS: true
  });


// middleware
app.use(express.json())

// DB config
const connection_url = 'mongodb+srv://admin:pw@cluster0.883rx.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    userCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    // create change stream that should connect to pusher
const db = mongoose.connection
db.once('open',() => {
    console.log("DB connected")
    // give the name what collection to listen
    const msgCollection = db.collection("messagecontents"); // !! collection name same as collection from schema and cluster
    const changeStream = msgCollection.watch() // watch that collection changes

    // function to fire when  somthing change in our DB
    changeStream.on('change',(change) => { // what change in DB = input that made by FE
        console.log(change)
        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', { // (channel,event)pusher has a channal called 'messages', insert data we want to watch
                name: messageDetails.user,
                message: messageDetails.message
            });
        }
        else {
            console.log('Error triggering Pusher')
        }
    })
}

)

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

// get all messages from DB
app.get('/messages/sync',(req,res) => {
    // eslint-disable-next-line array-callback-return
    Messages.find((err,data) => {
        if(err) {
            res.status(500).send(err)
        }else {
            res.status(200).send(`new message created: \n ${data}`)
        }
    })
})


// listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))