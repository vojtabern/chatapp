//const { render } = require('ejs');
const express = require('express')

//const { request } = require('http');
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 }= require('uuid')
const path = require ('path');
app.use("/static", express.static('./static/'));
 

//app.use("/static", express.static(path.join(__dirname, './static/')))

//app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

app.get('/',(req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room',(roomId, userId) => {
        socket.join(roomId)
        //socket.to(roomId).broadcast.
        socket.broadcast.emit('user-connected', userId);
        console.log(roomId, userId);
    })
    socket.on('chat', msg => {
        io.emit('message', msg);
    })
})




server.listen(8080)