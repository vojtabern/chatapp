
const socket = io();
const chat = document.getElementById('chat');
const button = document.getElementById('vloz');
const zprava = document.getElementById('message');
const jmeno = document.getElementById('jmeno');
const vloz_jm = document.getElementById('vloz_jm')
const kokos = document.getElementById('kokos')
const kokos1 = document.getElementById('kokos1')
let zab;

/*const myPeer = newPeer(undefined, {
    host: '/',
    port: '8081'
})*/
vloz_jm.addEventListener('click', function(e) {
    zab = jmeno.value;
    if(zab!=0){
    kokos.style.visibility = 'hidden';
    kokos1.style.visibility = 'visible';
    socket.emit('join-room', ROOM_ID, jmeno.value);
    socket.emit('username', jmeno.value);
    console.log(jmeno);
    }
})


socket.on('user-connected', userId => {
    chat.innerHTML += `<div id="earlyaccess"> Právě se připojil ${userId} </div>` ;
    console.log('User connected ' + userId)


}) 
let honza;
   socket.on('message', message => {
       honza = message;
        //chat.innerHTML += `<p id="barva">${message} </p></div></div>`;
        console.log(message);
    })
let frajer;
    socket.on('username', username => {
        console.log(username);
        frajer=username;
        //chat.innerHTML += `<div class="row"><div class="col-sm-3"><p id="barva"> ${username}</p>`;   
    
    if(honza){
        chat.innerHTML += `<div class="row" id="mes" ><div class="col-sm-3"><p id="barva">${frajer}: ${honza}</div></div></p>`
    }
})


button.addEventListener('click', function(e) {
    if (zprava.value)
    socket.emit ('chat', zprava.value);
    socket.emit('username', jmeno.value);
    
})

