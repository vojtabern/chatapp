
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
    socket.emit('join-room', ROOM_ID, 'Někdo (early access)');
    console.log(jmeno);
    }
})


socket.on('user-connected', userId => {
    chat.innerHTML += `<div id="earlyaccess"> Právě se připojil ${userId} </div>` ;
    console.log('User connected ' + userId)
})

socket.on('message', message => {
    chat.innerHTML += `<div id="barva"> ${zab}: ${message} </div>`;
    console.log(message)
})

button.addEventListener('click', function(e) {
    if (zprava.value)
    socket.emit ('chat', zprava.value);
    
})

