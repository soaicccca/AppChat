var socket = io('http://localhost:3000');

function info() {
    document.getElementById('online').style.display = "none";
    socket.emit("send_info", {
        name: document.getElementById('name').innerHTML,
        image: document.getElementById('image').innerHTML,
        email: document.getElementById('email').innerHTML
    });
}

function onl() {
    document.getElementById('friends').style.display = "none";
    document.getElementById('online').style.display = "block";
}

function add_friend() {

}