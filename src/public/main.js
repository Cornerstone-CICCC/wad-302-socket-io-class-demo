console.log('client ready');

const socket = io();

let currentRoom = null;

const roomSelect = document.getElementById('roomSelect');
const joinRoomButton = document.getElementById('joinRoomButton');
const leaveRoomButton = document.getElementById('leaveRoomButton');
const currentRoomSelected = document.getElementById('currentRoom');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');


joinRoomButton.addEventListener('click', ()=>{
    const room = roomSelect.value;
    if(currentRoom){
        socket.emit('leaveRoom', currentRoom);
    }
    currentRoom = room;
    currentRoomSelected.innerText = currentRoom;
    socket.emit('joinRoom', room ,99);
})
leaveRoomButton.addEventListener('click', ()=>{
    if(currentRoom){
        socket.emit('leaveRoom', currentRoom);
        currentRoom = null;
        currentRoomSelected.innerText = 'NONE';

    }
})
sendButton.addEventListener('click', ()=>{
    const message = messageInput.value;
    if( currentRoom){
        socket.emit('message', {room: currentRoom, message})
        messageInput.value = '';
    }
})

socket.on('message', ({id, message})=>{
    console.log('received on client:' ,message);

    const messageElement = document.createElement('div');
    messageElement.textContent = `${id}:${message}`

    messagesDiv.appendChild(messageElement);
})